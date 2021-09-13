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
  
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product['image'];
    const div = document.createElement("div");
    div.classList.add('single-product')
    div.innerHTML = `
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <span class="span">rating : ${product.rating['rate']}</span
      <span class="span">count : ${product.rating['count']}</span
      <br/>
      <h3>Price: $ ${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn custom" onclick=getId(${product.id})>Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
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
 console.log(data);
 const {title , price , description , image , rating} = data
 const singleContainer = document.getElementById('single-container');
 singleContainer.innerHTML = `
 
 <div class="col  ">
      <div class="card single-cart p-3 ">
        <img  src="${image}" class="card-img-top singleCardImg" alt="..." >
        <div class="card-body">
          <h4 class="card-title">${title}</h4>
           <h3>Price : $${price} </h3>
           <span class="span"> rating : ${rating['rate']} </span> 
           <span class="span mb-3s"> Count : ${rating['count']} </span> 
          <p class="card-text">Description : ${description.slice(0,100)}</p>
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
  console.log(getInputValue('price'))
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
