import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../button";
import { IMG } from "@/utils/constants";
import { IndianRupee } from "lucide-react";

import PropTypes from "prop-types";

const ProductCard = ({
  productName,
  productCategory,
  variant,
  cart,
  onAddToCart,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  const cartItem = cart.find((item) => item.variant._id === variant._id);
  return (
    <div>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>{productName}</CardTitle>
          <CardDescription>{productCategory}</CardDescription>
        </CardHeader>
        <CardContent>
          <img className="w-40 h-40 mx-auto" src={IMG} />
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex place-items-center">
                <IndianRupee className="size-4" />
                {variant.price}
              </div>
            </div>
            <CardDescription>
              <div className="flex">
                In Stock:
                {variant.stock}
              </div>
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          {cartItem ? (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDecrementQuantity(variant._id)}
              >
                -
              </Button>
              <span className="mx-2">{cartItem.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onIncrementQuantity(variant._id)}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-secondary text-primary hover:text-secondary"
              onClick={() => onAddToCart(productName, variant)}
            >
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  variant: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string.isRequired,
      variant: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onIncrementQuantity: PropTypes.func.isRequired,
  onDecrementQuantity: PropTypes.func.isRequired,
};

export default ProductCard;