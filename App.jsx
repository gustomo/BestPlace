import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { SearchNormal } from 'iconsax-react-native';

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Best Place</Text>
        <Text style={styles.subtitle}>Cari tempat wisata favoritmu</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari destinasi..."
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.button}>
          <SearchNormal color="white" size={20} />
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Rekomendasi Populer</Text>
      <ScrollView horizontal style={styles.cardScroll}>
        {['Bali', 'Yogyakarta', 'Labuan Bajo'].map((place, idx) => (
          <View key={idx} style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: `https://source.unsplash.com/300x200/?${place}` }}
            />
            <Text style={styles.cardTitle}>{place}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#e0f0ff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    margin: 24,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: 40,
    backgroundColor: '#3560e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginHorizontal: 24,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardScroll: {
    paddingLeft: 24,
  },
  card: {
    marginRight: 15,
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    textAlign: 'center',
    padding: 9,
    fontSize: 14,
    color: '#000',
  },
});
