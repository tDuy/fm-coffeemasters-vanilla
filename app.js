import Store from "./services/store.js";
import API from "./services/api.js";
import { loadMenu } from "./services/Menu.js";
import Router from "./services/Router.js";

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
      const element = document.createElement("h1");
      element.textContent = "Welcome to our restaurant!";
      return element;
    },
  },
  {
    pathname: "/order",
    getComponent: () => {
      const element = document.createElement("h1");
      element.textContent = "Order";
      return element;
    },
  },
  {
    pathname: "/product/:id",
    getComponent: (path) => {
      const id = path.match(/\/product\/(\d+)/)[1];
      const element = document.createElement("h1");
      element.textContent = `Order ${id}`;
      element.dataset.id = id;
      return element;
    },
  },
];

window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");

  loadMenu();
  app.router.init(routes);
});
