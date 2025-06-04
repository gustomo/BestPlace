import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { SearchNormal } from 'iconsax-react-native';
import { colors, fontType } from '../theme';
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'places'));
      const data = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      setBlogList(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const filteredPlaces = useMemo(() => {
    return blogList.filter(blog =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, blogList]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Place</Text>
        <Text style={styles.subtitle}>Cari destinasi wisata favoritmu</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari tempat wisata..."
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.button}>
          <SearchNormal color={colors.white()} size={20} />
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Favorite')}
        style={styles.favoriteButton}
      >
        <Text style={styles.favoriteText}>❤️ Lihat Tempat Favorit</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>🌟 Rekomendasi</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {filteredPlaces.map((item, idx) => (
          <Animated.View entering={FadeInUp.delay(idx * 100)} key={item.id}>
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { place: item.title })}
            >
              <Image
                style={styles.image}
                source={{ uri: item.image }}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: colors.blue(0.05),
  },
  title: {
    fontSize: 28,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  searchContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey(0.3),
    borderRadius: 12,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.grey(0.05),
  },
  button: {
    width: 45,
    backgroundColor: colors.blue(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.blue(0.1),
    borderRadius: 10,
  },
  favoriteText: {
    textAlign: 'center',
    fontFamily: fontType['Pjs-Bold'],
    color: colors.blue(),
    fontSize: 16,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  horizontalScroll: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  card: {
    marginRight: 16,
    width: screenWidth * 0.6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.grey(0.05),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 130,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.black(),
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white(),
  },
});