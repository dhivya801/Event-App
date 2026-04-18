import React from "react";
import "./Product.css";


const products = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    rating: 2.56,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    availabilityStatus: "In Stock",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    rating: 2.86,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    availabilityStatus: "In Stock",
  },
  {
    id: 3,
    title: "Powder Canister",
    price: 14.99,
    rating: 4.64,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    availabilityStatus: "In Stock",
  },
  {
    id: 4,
    title: "Red Lipstick",
    price: 12.99,
    rating: 4.36,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
    availabilityStatus: "In Stock",
  },
];

function App() {
  return (
    <div className="container">
      <h1>New Arrivals: Best Sellers in Beauty</h1>

      <div className="product-grid">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="price">${item.price}</p>
            <p className="rating">⭐ {item.rating}</p>
            <p className="stock">{item.availabilityStatus}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;