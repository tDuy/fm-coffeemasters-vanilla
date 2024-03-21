import Store from "./services/store.js";
import { loadMenu } from "./services/Menu.js";
import Router from "./services/Router.js";

// Link web components
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {
  store: Store,
  router: Router,
};

function $(a) {
  return document.querySelector(a);
}
window.$ = $;

function $$(a) {
  return document.querySelectorAll(a);
}
window.$$ = $$;

const routes = [
  {
    pathname: "/",
    getComponent: () => {
      return document.createElement("menu-page");
    },
  },
  {
    pathname: "/order",
    getComponent: () => {
      return document.createElement("order-page");
    },
  },
  {
    pathname: "/product/:id",
    getComponent: (path) => {
      const id = path.match(/\/product\/(\d+)/)[1];
      const element = document.createElement("details-page");
      element.textContent = `Order ${id}`;
      element.dataset.productId = id;
      return element;
    },
  },
];

window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");

  loadMenu();
  app.router.init(routes);
});

window.addEventListener("app-cart-updated", () => {
  const badge = $("#badge");
  const qty = app.store.cart.reduce((acc, p) => acc + p.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
})