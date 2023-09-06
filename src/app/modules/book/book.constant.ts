export const BookSeachableFields = ['title', 'author', 'genre'];


export const BookRelationalFields = ['category', 'minPrice', 'maxPrice'];

export const BookRelationalFieldsMapper: {
  [key: string]: string;
} = {
  category: 'category',
};