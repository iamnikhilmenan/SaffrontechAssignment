import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import THEME from '../config/Theme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

type BookListProps = {
  booksData: Book[];
  pathName: string;
};

type RootStackParamList = {
  BookDetailsScreen: {
    data: Book;
  };
};

type Styles = {
  rootContainer: ViewStyle;
  bookListContainer: ViewStyle;
  bookContainer: ViewStyle;
  thumbnail: ImageStyle;
  bookInfoContainer: ViewStyle;
  bookNameText: TextStyle;
  bookAuthorText: TextStyle;
  btnContainer: ViewStyle;
  btnText: TextStyle;
};

const defaultImg = require('../assets/images/book.jpg');

export default function BookList({
  booksData,
  pathName,
}: BookListProps): React.JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [favorites, setFavorites] = useState<Book[]>([]);

  const onViewDetailHandler = (item: Book): void => {
    navigation.navigate('BookDetailsScreen', {
      data: item,
    });
  };

  const onAddToFavHandler = (book: Book): void => {
    if (!favorites.some((fav: any) => fav.id === book.id)) {
      const newFavorites = [...favorites, book];
      setFavorites(newFavorites);
      AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      Alert.alert('Save to favorite');
      console.log('Added to favorite');
    } else {
      Alert.alert('Book already in favorites');
      console.log('Book already in favorite');
    }
  };

  const onRemoveFavHandler = (id: string): void => {
    const newFavorites = favorites.filter((book: any) => book.id !== id);
    setFavorites(newFavorites);
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    Alert.alert('Remove from favorite');
    console.log('Remove into favorite');
  };

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={booksData}
        contentContainerStyle={styles.bookListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.bookContainer} key={item.id}>
            {item?.volumeInfo?.imageLinks?.thumbnail && (
              <Image
                source={{
                  uri: item?.volumeInfo?.imageLinks?.thumbnail,
                }}
                style={styles.thumbnail}
              />
            )}
            <View style={styles.bookInfoContainer}>
              <View>
                {item?.volumeInfo?.title && (
                  <Text style={styles.bookNameText} numberOfLines={1}>
                    {item?.volumeInfo?.title}
                  </Text>
                )}
                {item?.volumeInfo?.authors?.length >= 0 && (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#000', fontWeight: '500'}}>
                      Author:{' '}
                    </Text>
                    <Text style={styles.bookAuthorText} numberOfLines={3}>
                      {item?.volumeInfo?.authors[0]}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={[
                    styles.btnContainer,
                    {
                      backgroundColor: THEME.COLORS.white,
                      marginBottom: 5,
                      borderColor: THEME.COLORS.black,
                      borderWidth: 0.5,
                    },
                  ]}
                  onPress={() => onViewDetailHandler(item)}>
                  <Text style={[styles.btnText, {color: THEME.COLORS.black}]}>
                    View Details
                  </Text>
                </TouchableOpacity>
                {pathName === 'Favorite' ? (
                  <TouchableOpacity
                    style={[styles.btnContainer]}
                    onPress={() => onRemoveFavHandler(item.id)}>
                    <Text style={styles.btnText}>Remove</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.btnContainer]}
                    onPress={() => onAddToFavHandler(item)}>
                    <Text style={styles.btnText}>Add to Fav</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles: Styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
  },
  bookListContainer: {},
  bookContainer: {
    backgroundColor: THEME.COLORS.white,
    height: THEME.SIZE.width / 2.5,
    marginBottom: THEME.SIZE.default / 8,
    borderRadius: THEME.SIZE.default / 10,
    overflow: 'hidden',
    elevation: 5,
    flexDirection: 'row',
  },
  thumbnail: {
    width: THEME.SIZE.width / 3.5,
    height: '100%',
    resizeMode: 'stretch',
  },
  bookInfoContainer: {
    flex: 1,
    overflow: 'hidden',
    margin: THEME.SIZE.default / 10,
    justifyContent: 'space-between',
  },
  bookNameText: {
    fontSize: 18,
    color: THEME.COLORS.black,
    fontWeight: '600',
  },
  bookAuthorText: {
    fontSize: 14,
    fontWeight: '400',
    color: THEME.COLORS.black,
  },
  btnContainer: {
    backgroundColor: THEME.COLORS.secondaryBlue,
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: THEME.COLORS.white,
  },
});
