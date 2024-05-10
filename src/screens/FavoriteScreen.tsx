import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import THEME from '../config/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookList from '../components/BookList';
import {useIsFocused, useRoute} from '@react-navigation/native';

export default function FavoriteScreen() {
  const {name} = useRoute();
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [isFocused]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerTitleText}>Check Your Collection</Text>
      <BookList booksData={favorites} pathName={name} />
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
