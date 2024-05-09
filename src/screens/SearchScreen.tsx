import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import THEME from '../config/Theme';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

type searchScreenTypes = {};

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
};

export default function SearchScreen({}: searchScreenTypes): React.JSX.Element {
  const [searchText, setSearchText] = useState<string>('');
  const [data, setData] = useState<Book[]>([]);
  const [err, setErr] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBooksData = async (searchText: string) => {
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      if (searchText !== '') {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`;
        const res = await axios.get(apiUrl);
        setData(res?.data?.items);
      }
    } catch (error) {
      setErr(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooksData('default');
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearchHandler={() => getBooksData(searchText)}
          isLoading={isLoading}
        />
      </View>
      <View style={styles.bookListContainer}>
        {isLoading ? <ActivityIndicator /> : <BookList booksData={data} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: THEME.SIZE.default / 6,
  },
  searchBarContainer: {
    marginVertical: THEME.SIZE.default / 5,
  },
  bookListContainer: {
    flex: 1,
  },
});
