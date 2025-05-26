import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { colors, fontType } from '../theme';

const favoritePlaces = ['Bali', 'Labuan Bajo'];

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritmu</Text>
      <FlatList
        data={favoritePlaces}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: `https://source.unsplash.com/300x200/?${item}` }}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>{item}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    margin: 20,
    color: colors.black(),
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.grey(0.05),
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
});
