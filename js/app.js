// load Search item data
const loadSearchProducts = async() => {
  // get input value
  const inputValue = document.getElementById('input-field');
  const inputText = inputValue.value;
  //Clear input value
  inputValue.value = '';
  if(inputText === ''){
    return;
  }
  const url = `https://fakestoreapi.com/products/category/${inputText}`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.length === 0) {
    return;
  }
  showProducts(data);
}


// Load data function
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // Clear container
  document.getElementById('single-container').textContent = '';
 const AllCart= document.getElementById("all-products");
 AllCart.textContent = '';
  for (const product of products) {
    const image = product['image'];
    const div = document.createElement("div");
    div.classList.add('single-product')
    div.innerHTML = `
    <img class="product-image" src=${image}></img>
      </div>
      <h4 class="product-title">${product.title.slice(0,60)}</h4>
      <p class="product-category">Category : ${product.category}</p>
      <span class="span">Rated: ${product.rating['count']} People </span>
      <br/>
      <span class="span">Average Rating : ${product.rating['rate']}</span>
      <br/>
      <h3 class="product-price">Price: $ ${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary me-2">Add to cart</button>
      <button id="details-btn" class="btn custom" onclick=getId(${product.id})>Details</button></div>
      `;
      AllCart.appendChild(div);
  }
};


// single product load
const getId = async (id) => {
  url = `https://fakestoreapi.com/products/${id}`;
  res = await fetch(url);
  data = await res.json();
  displaySingleItem(data);
}


// dispaly single product
const displaySingleItem = (data) => {
 const {title , price , description , image , rating} = data
 const singleContainer = document.getElementById('single-container');
 singleContainer.innerHTML = `
 <div class="col  ">
      <div class="card single-cart p-3 ">
        <img  src="${image}" class="card-img-top singleCardImg" alt="..." >
        <div class="card-body">
          <h3 class="card-title product-title">${title}</h3>
           <h3 class="product-price">Price : $${price} </h3>
           <span class="span mb-4 product-category"> Rated: ${rating['count']} People </span> 
           <br/>
           <span class="span product-category"> Average rating : ${rating['rate']} </span> 
          <p class="card-text description">Description : ${description.slice(0,100)}</p>
        </div>
      </div>
    </div>
 `
}

// count product
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get value funciton
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
