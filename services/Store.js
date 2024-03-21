const Store = {
  menu: null,
  cart: [],
}

const proxiedStore = new Proxy(Store, {
  set: (target, property, value) => {
    target[property] = value;
    if (property === 'cart') {
      window.dispatchEvent(new Event('app-cart-updated'));
    }
    if (property === 'menu') {
      console.log('menu updated')
      window.dispatchEvent(new Event('app-menu-updated'));
    }
    return true;
  }
});

export default proxiedStore;