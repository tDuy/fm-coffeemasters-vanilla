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
  }
}

customElements.define('menu-page', MenuPage);