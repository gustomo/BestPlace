import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { colors, fontType } from '../theme';

export default function FormScreen() {
  const [place, setPlace] = useState('');

  const handleSubmit = () => {
    if (place.trim()) {
      Alert.alert('Sukses', `Tempat "${place}" berhasil ditambahkan!`);
      setPlace('');
    } else {
      Alert.alert('Error', 'Nama tempat tidak boleh kosong!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tempat Wisata</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Tempat"
        value={place}
        onChangeText={setPlace}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tambah</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey(0.3),
    borderRadius: 8,
    padding: 12,
    fontFamily: fontType['Pjs-Regular'],
    backgroundColor: colors.grey(0.05),
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.blue(),
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white(),
    fontFamily: fontType['Pjs-Bold'],
    textAlign: 'center',
  },
});
