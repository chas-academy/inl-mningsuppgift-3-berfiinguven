// Enkel varukorg

document.addEventListener("DOMContentLoaded", () => {
  // 1) Hämta HTML-element
  const productInput = document.getElementById("productInput");
  const priceInput   = document.getElementById("priceInput");
  const addButton    = document.getElementById("addButton");
  const cartList     = document.getElementById("cartList");

  // 2) Själva varukorgen (en array av objekt)
  //    Varje objekt: { productName, price, quantity }
  const cart = [];

  // 3) Funktion som skriver ut varukorgen i listan <ul id="cartList">
  function renderCart() {
    cartList.innerHTML = ""; // töm listan
    for (const item of cart) {
      const li = document.createElement("li");
      li.textContent = `${item.productName} – ${item.price} kr × ${item.quantity}`;
      cartList.appendChild(li);
    }
  }

  // 4) Klick på "Lägg till"-knappen
  addButton.addEventListener("click", () => {
    const name = productInput.value.trim();

    // Tillåt både punkt och komma som decimaltecken
    const price = Number(priceInput.value.trim().replace(",", "."));

    // Enkelt validering: måste ha namn och pris som tal >= 0
    if (name === "" || !Number.isFinite(price) || price < 0) {
      alert("Skriv produktnamn och ett giltigt pris (tal).");
      return;
    }

    // 5) Finns varan redan? -> öka quantity, annars lägg till ny
    const existing = cart.find(
      (p) => p.productName.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productName: name, price: price, quantity: 1 });
    }

    // 6) Uppdatera listan och rensa fälten
    renderCart();
    productInput.value = "";
    priceInput.value = "";
    productInput.focus();
  });

  // Enter ska också funka
  const enterToAdd = (e) => { if (e.key === "Enter") addButton.click(); };
  productInput.addEventListener("keydown", enterToAdd);
  priceInput.addEventListener("keydown", enterToAdd);

  // Start: rendera tom varukorg
  renderCart();
});
