
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
import { colors, fontType } from './src/theme';
import { CategoryList, BlogList } from './src/data';
import { ListHorizontal, ItemSmall } from './src/components';

const ItemCategory = ({ item, onPress, color }) => (
  <Pressable onPress={onPress}>
    <View style={category.item}>
      <Text style={{ ...category.title, color }}>{item.categoryName}</Text>
    </View>
  </Pressable>
);

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);

  const renderItem = ({ item }) => {
    const color = item.id === selected ? colors.blue() : colors.grey();
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };

  return (
    <FlatList
      data={CategoryList}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    />
  );
};


export default function App() {
  const [search, setSearch] = useState('');

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

      <Text style={styles.sectionTitle}>Rekomendasi Populer</Text>
      <ScrollView horizontal style={styles.horizontalScroll}>
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

const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 3);
  const verticalData = BlogList.slice(3);

  return (
    <View style={styles.listBlog}>
      <ListHorizontal data={horizontalData} />
      <View style={styles.listCard}>
        {verticalData.map((item, index) => (
          <ItemSmall key={index} item={item} />
        ))}
      </View>
    </View>
  );
};
