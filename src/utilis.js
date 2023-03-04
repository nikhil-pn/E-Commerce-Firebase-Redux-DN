//cart item count function
export function getItemCount(cartItem) {
  return cartItem.reduce((sum, cartItem) => cartItem.quantity + sum, 0);
}

//subtotal function
export function getSubtotal(cartItem) {
  return cartItem.reduce(
    (sum, { product, quantity }) => product.price * quantity + sum,
    0
  );
}
