export class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.loaddCss();
  }

  async loaddCss() {
    const css = await fetch("/components/MenuPage.css");
    const cssText = await css.text();
    const style = document.createElement("style");
    style.textContent = cssText;
    this.root.appendChild(style);
  }

  connectedCallback() {
    const template = $("#menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.render();

    window.addEventListener("app-menu-updated", () => {
      this.render();
    });
  }

  render() {
    if (app.store.menu) {
      const menuElement = this.root.querySelector("#menu");
      menuElement.innerHTML = "";
      
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class="category"></ul>
        `;

        category.products.map((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });

        this.root.querySelector("#menu").appendChild(liCategory);
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "<p>Loading...</p>";
    }
  }
}

customElements.define("menu-page", MenuPage);
