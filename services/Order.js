import { getProductById } from './Menu.js';

export async function addToCart(id) {
  const product = await getProductById(id);
  const productInCart = app.store.cart.find(p => p.id == id);
  if (productInCart) {
    app.store.cart = app.store.cart.map(p => {
      if (p.id == id) {
        p.quantity++;
      }
      return p;
    });
  } else {
    app.store.cart = [...app.store.cart, { ...product, quantity: 1 }]
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(p => p.id != id);
}