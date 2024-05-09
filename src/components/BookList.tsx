import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import THEME from '../config/Theme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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
};

type RootStackParamList = {
  BookDetailsScreen: {
    data: Book;
  };
};

const defaultImg = require('../assets/images/book.jpg');

export default function BookList({
  booksData,
  onAddToFavHandler,
}: BookListProps): React.JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onViewDetailHandler = (item: Book): void => {
    navigation.navigate('BookDetailsScreen', {
      data: item,
    });
  };

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={booksData}
        contentContainerStyle={styles.bookListContainer}
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
                  <Text style={styles.bookNameText} numberOfLines={2}>
                    {item?.volumeInfo?.title}
                  </Text>
                )}
                {item?.volumeInfo?.authors?.length >= 0 && (
                  <Text style={styles.bookAuthorText} numberOfLines={3}>
                    {item?.volumeInfo?.authors[0]}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 12,
                }}>
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={onAddToFavHandler}>
                  <Text style={styles.btnText}>Add to Fav</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btnContainer,
                    {backgroundColor: THEME.COLORS.white},
                  ]}
                  onPress={() => onViewDetailHandler(item)}>
                  <Text style={[styles.btnText, {color: THEME.COLORS.black}]}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles: any = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
  },
  bookListContainer: {},
  bookContainer: {
    backgroundColor: THEME.COLORS.white,
    marginBottom: THEME.SIZE.default / 5,
    elevation: 5,
    flexDirection: 'row',
    borderRadius: THEME.SIZE.default / 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: THEME.SIZE.width / 4,
    height: THEME.SIZE.width / 3,
    resizeMode: 'stretch',
  },
  bookInfoContainer: {
    flex: 1,
    margin: THEME.SIZE.default / 10,
    justifyContent: 'space-between',
  },
  bookNameText: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  bookAuthorText: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: '400',
  },
  btnContainer: {
    backgroundColor: THEME.COLORS.black,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: THEME.COLORS.white,
  },
});
