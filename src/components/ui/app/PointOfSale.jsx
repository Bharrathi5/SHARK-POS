import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { Button } from "../ui/button";
import { IndianRupee } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui/card";
import { Separator } from "../ui/separator";

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
        <div className="flex mt-10">
          <Card className="w-[300px] bg-muted">
            <CardHeader>
              <CardTitle>Cart</CardTitle>
              <CardDescription>Items on your cart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="">
                {cart.length ? (
                  cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 justify-between items-center space-y-2 mb-6"
                    >
                      <div className="flex flex-row gap-5 justify-around">
                        <div className="flex flex-col">
                          <strong>{item.productName}</strong>
                          <div className="flex items-center mt-1">
                            <IndianRupee className="size-4" />
                            <span className="ml-1">{item.variant.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="mx-2"
                            onClick={() =>
                              handleDecrementQuantity(item.variant._id)
                            }
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="mx-2"
                            onClick={() =>
                              handleIncrementQuantity(item.variant._id)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Separator className="bg-primary " />
                    </div>
                  ))
                ) : (
                  <div>Your cart is empty!</div>
                )}
              </div>
              <div className="py-4">
                <strong>Total: ₹{calculateTotal()}</strong>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
