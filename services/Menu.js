import API from './api.js';

export async function loadMenu() {
  app.store.menu = await API.fetchMenu();
}