import { Product } from '../interfaces/ProductInterface';

export const transformProductForMobile = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  isAvailable: product.available
});

export const transformProductForWeb = (product: Product) => ({
  ...product,
  formattedPrice: `R$ ${product.price.toFixed(2).replace('.', ',')}`
});

export const groupProductsByCategory = (products: Product[]) => {
  return products.reduce((acc, product) => {
    if (!acc[product.categoryId]) acc[product.categoryId] = [];
    acc[product.categoryId].push(product);
    return acc;
  }, {} as Record<number, Product[]>);
};
