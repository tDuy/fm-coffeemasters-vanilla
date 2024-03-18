import Store from './services/store.js';
import API from './services/api.js';
import { loadMenu } from './services/Menu.js';

window.app = {
  store: Store,
};

window.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM fully loaded and parsed');
  const $ = () => document.querySelector.call(this, arguments);

  loadMenu();
});