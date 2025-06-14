import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors, fontType } from '../theme';
import { getFirestore, collection, getDocs, deleteDoc, doc } from '@react-native-firebase/firestore';

export default function FavoriteScreen() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'places'));
      const data = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      setPlaces(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Gagal', 'Gagal memuat data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ingin menghapus tempat ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirestore();
              await deleteDoc(doc(db, 'places', id));
              fetchPlaces();
            } catch (err) {
              console.log(err);
              Alert.alert('Gagal', 'Gagal menghapus data');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>Hapus</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tempat Favorit</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.blue()} />
      ) : (
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    marginBottom: 16,
    textAlign: 'center',
    color: colors.black(),
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.grey(0.1),
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 16,
    color: colors.black(),
  },
  deleteButton: {
    backgroundColor: colors.red(0.8),
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
  },
});