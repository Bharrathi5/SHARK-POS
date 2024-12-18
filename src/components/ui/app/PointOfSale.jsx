import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useState } from "react";
import CartCard from "./CartCard";

const PointOfSale = () => {
  const { products } = useSelector((store) => store.table);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productName, variant) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.variant._id === variant._id
      );
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { productName, variant, quantity: 1 }];
      }
    });
  };

  const handleIncrementQuantity = (variantId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.variant._id === variantId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrementQuantity = (variantId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.variant._id === variantId && item.quantity >= 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.variant.price * item.quantity, 0);

  return (
    <div>
      <h1>Point Of Sales</h1>
      <div className="flex">
        <div className="flex felx-col flex-wrap gap-6 mt-10 justify-around">
          {products.map((product) =>
            product.variants.map((variant, index) => (
              <ProductCard
                key={`${product._id}-${index}`}
                productName={product.name}
                productCategory={product.category}
                variant={variant}
                cart={cart}
                onAddToCart={handleAddToCart}
                onIncrementQuantity={handleIncrementQuantity}
                onDecrementQuantity={handleDecrementQuantity}
              />
            ))
          )}
        </div>
        <div className="flex mt-10"></div>
        <CartCard
          cart={cart}
          onIncrementQuantity={handleIncrementQuantity}
          onDecrementQuantity={handleDecrementQuantity}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};

export default PointOfSale;
