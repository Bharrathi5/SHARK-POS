import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui/card";
import { Badge } from "../badge";

const Orders = () => {
  const { orders } = useSelector((store) => store.orders);
  console.log(orders);
  return (
    <div>
      <h1>Orders</h1>
      <div className="flex flex-col space-y-5 mt-10">
        {orders.length ? (
          orders.map((order, index) => (
            <div key={order.id}>
              <Card className="w-2/3">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Order{index + 1} </CardTitle>
                    <Badge>{order.paymentStatus}</Badge>
                  </div>
                  <CardDescription>Order-id:{order.id}</CardDescription>
                  <CardDescription>
                    Created at:{order.createdAt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <strong>Items:</strong>
                    <ul>
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.productName} x {item.quantity} - ₹
                          {item.variant.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <strong>Total: ₹{order.total}</strong>
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <p>No Orders Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
