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
import { useNavigation } from '@react-navigation/native';
import { SearchNormal } from 'iconsax-react-native';
import { colors, fontType } from '../theme';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const places = ['Bali', 'Yogyakarta', 'Labuan Bajo'];

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

      {/* Tombol ke FavoriteScreen */}
      <Pressable
        onPress={() => navigation.navigate('Favorite')}
        style={styles.favoriteButton}
      >
        <Text style={styles.favoriteText}>Lihat Tempat Favorit</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Rekomendasi Populer</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
        {places.map((place, idx) => (
          <Pressable
            key={idx}
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { place })}
          >
            <Image
              style={styles.image}
              source={{ uri: `https://source.unsplash.com/300x200/?${place}` }}
            />
            <Text style={styles.cardTitle}>{place}</Text>
          </Pressable>
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
    backgroundColor: colors.blue(0.1),
  },
  title: {
    fontSize: 26,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  searchContainer: {
    margin: 24,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey(0.3),
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.grey(0.05),
  },
  button: {
    width: 40,
    backgroundColor: colors.blue(),
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    marginHorizontal: 24,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.blue(0.1),
    borderRadius: 8,
  },
  favoriteText: {
    textAlign: 'center',
    fontFamily: fontType['Pjs-Regular'],
    color: colors.blue(),
  },
  sectionTitle: {
    marginHorizontal: 24,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  horizontalScroll: {
    paddingLeft: 24,
  },
  card: {
    marginRight: 15,
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.grey(0.05),
  },
  image: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    textAlign: 'center',
    padding: 8,
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
    color: colors.black(),
  },
});
