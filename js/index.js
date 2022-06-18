// Scroll to products

let shopBtn = document.querySelector(`#shop-btn`);
let productsSection = document.querySelector(`#products-section`);
shopBtn.addEventListener(`click`, () => {
  productsSection.scrollIntoView();
});

// DARK MODE

// variables

let modeButton = document.querySelector(`.mode`);
let body = document.body;
let navBar = document.querySelector(`.navbar`);
let navBarLinks = document.querySelectorAll(`.nav-link`);
let header = document.querySelector(`header`);
let cards = document.querySelectorAll(`.card`);
let sections = [body, navBar, header];

// dark-mode functions

function darkMode(section) {
  section.classList.toggle(`dark-mode`);
}
function darkNav() {
  navBar.classList.toggle(`navbar-dark`);
}

// change picture function

function changePic(picClass, picLight, picDark) {
  let logo = document.querySelector(picClass).src;
  if (logo.indexOf(picLight) != -1) {
    document.querySelector(picClass).src = picDark;
  } else {
    document.querySelector(picClass).src = picLight;
  }
}

// change mode

modeButton.addEventListener(`click`, () => sections.forEach(darkMode));
modeButton.addEventListener(`click`, darkNav);
modeButton.addEventListener(`click`, () => navBarLinks.forEach(darkMode));
modeButton.addEventListener(`click`, () => cards.forEach(darkMode));
modeButton.addEventListener(`click`, function () {
  changePic(`.logo`, `images/logo.png`, `images/logo-dark.png`);
});
modeButton.addEventListener(`click`, function () {
  changePic(`.bag`, `images/atc.png`, `images/atc-dark.png`);
});
modeButton.addEventListener(`click`, function () {
  changePic(`.f-logo`, `images/logo.png`, `images/logo-dark.png`);
});

// SIDEBAR

let openBtn = document.querySelector(`.open-sidebar`);
let closeBtn = document.querySelector(`.close-sidebar`);
let sidebar = document.querySelector(`.sidebar`);

function openSidebar() {
  sidebar.style.width = `350px`;
}
function closeSidebar() {
  sidebar.style.width = `0px`;
}
openBtn.addEventListener(`click`, openSidebar);
closeBtn.addEventListener(`click`, closeSidebar);

// Add products to sidebar

let addProduct = () => {
  let productsList = document.querySelector(`.products-list`);

  // Update counter

  let cartCounter = document.querySelector(`#cart-counter`);
  ++cartCounter.innerHTML;

  // Creating product container

  let productContainer = document.createElement(`div`);
  productContainer.classList.add(`product-container`);
  productContainer.classList.add(`mb-3`);

  // Creating item column

  let sidebarItem = document.createElement(`div`);
  sidebarItem.classList.add(`sidebar-item`);

  let productImg = document.createElement(`img`);
  productImg.classList.add(`product-img`);
  productImg.setAttribute(
    `src`,
    `${event.target.parentElement.parentElement.parentElement.firstElementChild.src}`
  );

  let productType = document.createElement(`p`);
  let productTypeText = document.createTextNode(
    `${event.target.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML}`
  );
  productType.appendChild(productTypeText);

  sidebarItem.appendChild(productImg);
  sidebarItem.appendChild(productType);

  // Creating unit price column

  let productPrice = document.createElement(`div`);
  productPrice.classList.add(`product-price`);
  let ProductPriceText = document.createTextNode(
    `${event.target.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML}`
  );
  productPrice.appendChild(ProductPriceText);

  // Creating units column

  let sidebarUnits = document.createElement(`div`);
  sidebarUnits.classList.add(`sidebar-units`);

  let bagPlus = document.createElement(`img`);
  bagPlus.classList.add(`bag-plus`);
  bagPlus.setAttribute(`src`, `images/bag-plus-fill.png`);

  let quantity = document.createElement(`p`);
  quantity.classList.add(`quantity`);
  let quantityText = document.createTextNode(`1`);
  quantity.appendChild(quantityText);

  let bagDash = document.createElement(`img`);
  bagDash.classList.add(`bag-plus`);
  bagDash.setAttribute(`src`, `images/bag-dash-fill.png`);

  let bagX = document.createElement(`img`);
  bagX.classList.add(`bag-plus`);
  bagX.setAttribute(`src`, `images/bag-x-fill.png`);

  sidebarUnits.appendChild(bagPlus);
  sidebarUnits.appendChild(quantity);
  sidebarUnits.appendChild(bagDash);
  sidebarUnits.appendChild(bagX);

  productContainer.appendChild(sidebarItem);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(sidebarUnits);

  productsList.appendChild(productContainer);

  // Dynamic bag buttons

  bagPlus.addEventListener(`click`, () => {
    ++quantity.innerHTML;
    totalCalcualtor();
  });

  bagDash.addEventListener(`click`, () => {
    if (quantity.innerHTML > 1) {
      --quantity.innerHTML;
      totalCalcualtor();
    }
  });

  bagX.addEventListener(`click`, () => {
    productContainer.remove();
    --cartCounter.innerHTML;
    --itemsCounter.innerHTML;
    totalCalcualtor();
  });

  // Items Counter

  let itemsCounter = document.querySelector(`#items-counter`);
  ++itemsCounter.innerHTML;

  // Total Price

  let totalCalcualtor = () => {
    let totalPrice = 0;
    let products = document.querySelectorAll(`.product-container`);
    products.forEach((e) => {
      let priceContainer = e.querySelector(`.product-price`);
      let price = parseFloat(priceContainer.innerHTML.replace(`$`, ``));
      let quantityContainer = e.querySelector(`.quantity`);
      let quantity = parseInt(quantityContainer.innerHTML);

      totalPrice = totalPrice + price * quantity;
    });
    totalPrice = Math.round(totalPrice * 100) / 100;
    let totalPriceUpdate = document.querySelector(`#total-price`);
    totalPriceUpdate.innerHTML = totalPrice;
  };
  totalCalcualtor();

  // remove event listner
  let products = document.querySelectorAll(`.product-container`);
  event.target.removeEventListener(`click`, addProduct);
  // End of addProduct function //
};

// Add products on click

let addProductBtns = document.querySelectorAll(`.add-product-btn`);

addProductBtns.forEach((btn) => {
  btn.addEventListener(`click`, addProduct);
});

// notes
