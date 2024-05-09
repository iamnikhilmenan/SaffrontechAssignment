import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import THEME from '../config/Theme';

import BookList from '../components/BookList';

export default function FavoriteScreen() {
  const onAddToFavHandler = () => {
    console.log('Add to fav======>');
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerTitleText}>Check Your Collection</Text>
      <BookList booksData={[]} onAddToFavHandler={onAddToFavHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: THEME.SIZE.default / 6,
  },
  headerTitleText: {
    color: THEME.COLORS.black,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: THEME.SIZE.default / 5,
    textTransform: 'capitalize',
    backgroundColor: THEME.COLORS.white,
    paddingVertical: THEME.SIZE.default / 10,
    elevation: 5,
  },
});
