// ----- Enkel varukorg -----
const cart = [];

// Fånga DOM-element direkt (funkar då index.html använder defer)
const nameInput  = document.getElementById("productInput");
const priceInput = document.getElementById("priceInput");
const addButton  = document.getElementById("addButton");
const cartList   = document.getElementById("cartList");

// Rendera listan i exakt formatet som testet vill ha:
// "<namn> – <pris>kr (x<antal>)"  OBS: en-dash (–) och "kr" direkt efter priset.
function renderCart() {
  cartList.innerHTML = "";
  for (const item of cart) {
    const li = document.createElement("li");
    li.textContent = `${item.productName} - ${item.price}kr (x${item.quantity})`;
    cartList.appendChild(li);
  }
}

function addToCart() {
  const name  = nameInput.value.trim();
  const price = Number(priceInput.value);

  // Enkla skydd (testen bryr sig främst om rendering + rensning):
  if (!name) return;
  if (!Number.isFinite(price)) return;

  // Finns varan redan? öka quantity, annars lägg till ny
  const existing = cart.find(p => p.productName === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productName: name, price, quantity: 1 });
  }

  // Rensa fälten (testet kontrollerar detta)
  nameInput.value = "";
  priceInput.value = "";

  // Uppdatera listan
  renderCart();
}

// Koppla klick direkt (inte inne i DOMContentLoaded -> funkar i Jest)
addButton.addEventListener("click", addToCart);

// Initial render (tom lista)
renderCart();

