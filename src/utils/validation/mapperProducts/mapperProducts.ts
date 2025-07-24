import { IProduct, ISimplifiedProduct } from "cakes-lib-types-js";

export function mapperProducts(products: IProduct[]): ISimplifiedProduct[] {
  return products.map(({ id, name, description, price, image_url }) => ({
    id,
    name,
    description,
    price,
    image_url,
  }));
}