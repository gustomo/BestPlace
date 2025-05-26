import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { colors, fontType } from '../theme';

export default function DetailScreen({ route }) {
  const { place } = route.params || { place: 'Bali' };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://source.unsplash.com/400x300/?${place}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{place}</Text>
      <Text style={styles.description}>
        {place} adalah salah satu destinasi wisata paling terkenal di Indonesia, menawarkan keindahan alam, budaya, dan pengalaman yang tak terlupakan.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    margin: 20,
    color: colors.black(),
  },
  description: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
    marginHorizontal: 20,
    marginBottom: 30,
  },
});
