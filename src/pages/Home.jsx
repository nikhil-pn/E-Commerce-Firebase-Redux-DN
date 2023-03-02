import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [products, setproducts] = useState(["prodcut"]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  async function fetchAllProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setproducts(result);
  }
  return (
    <div>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
