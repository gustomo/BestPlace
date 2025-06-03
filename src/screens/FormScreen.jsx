import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fontType } from '../theme';
import { addPlace } from '../api/placeApi';

export default function FormScreen() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!title || !image) {
      Alert.alert('Validasi', 'Mohon lengkapi semua data');
      return;
    }

    const newPlace = { title, image };

    addPlace(newPlace)
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil ditambahkan');
        navigation.goBack(); // atau navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'Gagal menambahkan data');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tambah Tempat Wisata</Text>

      <TextInput
        style={styles.input}
        placeholder="Judul Tempat"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="URL Gambar"
        value={image}
        onChangeText={setImage}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.grey(0.05),
    borderWidth: 1,
    borderColor: colors.grey(0.3),
    borderRadius: 10,
    padding: 12,
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.blue(),
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-Bold'],
  },
});
