import React from 'react';
import {render} from '@testing-library/react-native';
import BookDetailsScreen from '../../src/screens/BookDetailsScreen';

// Mock the useRoute hook
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      data: {
        volumeInfo: {
          title: 'Test Book',
          authors: ['Author Name'],
          imageLinks: {
            thumbnail: 'https://example.com/image.jpg',
          },
          categories: ['Category'],
          pageCount: 100,
          description: 'Test description',
        },
        saleInfo: {
          isEbook: true,
          listPrice: {
            amount: 10,
          },
        },
      },
    },
  }),
}));

describe('BookDetailsScreen', () => {
  test('renders book details correctly', () => {
    const {getByText} = render(<BookDetailsScreen />);

    expect(getByText('Test Book')).toBeDefined();
    expect(getByText('Author Name')).toBeDefined();
    expect(getByText('Category')).toBeDefined();
    expect(getByText('100 Pages')).toBeDefined();
    expect(getByText('Test description')).toBeDefined();
    expect(getByText('Buy | 10 Rs')).toBeDefined();
  });

  test('renders "Not for sale" text if not an ebook', () => {
    jest
      .spyOn(require('@react-navigation/native'), 'useRoute')
      .mockReturnValueOnce({
        params: {
          data: {
            volumeInfo: {
              title: 'Test Book',
              authors: ['Author Name'],
              imageLinks: {
                thumbnail: 'https://example.com/image.jpg',
              },
              categories: ['Category'],
              pageCount: 100,
              description: 'Test description',
            },
            saleInfo: {
              isEbook: false,
            },
          },
        },
      });

    const {getByText} = render(<BookDetailsScreen />);

    expect(getByText('Not for sale')).toBeDefined();
  });
});
