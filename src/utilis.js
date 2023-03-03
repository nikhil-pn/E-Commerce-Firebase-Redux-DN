//cart item count function 
export function getItemCount(cartItem) {
  return cartItem.reduce((sum, cartItem) => cartItem.quantity + sum, 0);
}
