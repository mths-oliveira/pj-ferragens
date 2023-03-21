import { Product } from './../backend/entities/product';

export function serializeProducts(productLike: any[] = []) {
  const products = productLike.map(
    ({ ref, name, description, image, price, isDisabled, _amount }) => {
      const product = new Product(
        ref,
        name,
        description,
        image,
        price,
        isDisabled,
        _amount
      );
      return product;
    }
  );
  return products;
}
