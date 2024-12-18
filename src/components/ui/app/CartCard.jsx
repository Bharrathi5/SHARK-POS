import PropTypes from "prop-types";
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

const CartCard = ({
  cart,
  onIncrementQuantity,
  onDecrementQuantity,
  calculateTotal,
  onCheckOut,
}) => {
  const total = calculateTotal();
  return (
    <div>
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
                        onClick={() => onDecrementQuantity(item.variant._id)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mx-2"
                        onClick={() => onIncrementQuantity(item.variant._id)}
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
            <strong>Total: ₹{total}</strong>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => onCheckOut(cart, total)}>Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

CartCard.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string.isRequired,
      variant: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onIncrementQuantity: PropTypes.func.isRequired,
  onDecrementQuantity: PropTypes.func.isRequired,
  calculateTotal: PropTypes.func.isRequired,
  onCheckOut: PropTypes.func.isRequired,
};

export default CartCard;
