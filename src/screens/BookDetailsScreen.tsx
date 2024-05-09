import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import THEME from '../config/Theme';
import {useRoute} from '@react-navigation/native';

type volumeInfo = {
  title: string;
  authors: string[];
  imageLinks: {
    thumbnail: string;
  };
  categories: string[];
  pageCount: number;
  description: string;
};

export default function BookDetailsScreen(): React.JSX.Element {
  const {params} = useRoute();

  const {
    imageLinks,
    title,
    authors,
    categories,
    pageCount,
    description,
  }: volumeInfo = params?.data?.volumeInfo;
  const {isEbook} = params?.data?.saleInfo;

  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.bookDetails}>
          <Image
            source={{uri: imageLinks.thumbnail}}
            style={styles.thumbnail}
          />
          <Text style={styles.bookTitle}>{title}</Text>
          <Text style={styles.authorName}>{authors[0]}</Text>
          <View style={styles.bookInfoContainer}>
            <Text style={{color: THEME.COLORS.black}}>{categories[0]}</Text>
            {isEbook && (
              <Text style={styles.priceText}>
                {params?.data?.saleInfo.listPrice?.amount} Rs
              </Text>
            )}
            <Text style={{color: THEME.COLORS.black}}>{pageCount} Pages</Text>
          </View>
          <Text style={styles.description} numberOfLines={8}>
            {description}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          {!isEbook ? (
            <Text style={styles.btnText}>Not for sale</Text>
          ) : (
            <Text style={styles.btnText}>
              Buy | {params?.data?.saleInfo.listPrice?.amount} Rs
            </Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles: any = StyleSheet.create({
  rootContainer: {
    backgroundColor: THEME.COLORS.white,
    flex: 1,
    justifyContent: 'space-between',
  },
  bookDetails: {
    alignItems: 'center',
    margin: THEME.SIZE.default / 2,
  },
  thumbnail: {
    width: THEME.SIZE.width / 2.4,
    height: THEME.SIZE.width / 1.5,
    borderRadius: THEME.SIZE.default / 5,
    elevation: 10,
    resizeMode: 'stretch',
    marginBottom: THEME.SIZE.default / 3,
  },
  bookTitle: {
    fontSize: 32,
    color: THEME.COLORS.black,
    fontWeight: '800',
    marginBottom: THEME.SIZE.default / 15,
  },
  bookInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: THEME.SIZE.default / 5,
  },
  authorName: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginBottom: THEME.SIZE.default / 5,
    color: THEME.COLORS.black,
    fontWeight: '500',
  },
  priceText: {
    paddingHorizontal: 18,
    paddingVertical: 2,
    backgroundColor: THEME.COLORS.black,
    color: THEME.COLORS.white,
    borderRadius: THEME.SIZE.default,
  },
  description: {
    fontSize: 16,
    color: THEME.COLORS.black,
    textAlign: 'left',
  },
  btnContainer: {
    backgroundColor: THEME.COLORS.black,
    marginHorizontal: THEME.SIZE.default / 2,
    marginBottom: THEME.SIZE.default / 2,
    borderRadius: THEME.SIZE.default / 8,
  },
  btnText: {
    color: THEME.COLORS.white,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 18,
    textAlign: 'center',
    fontSize: 24,
    elevation: 7,
  },
});
