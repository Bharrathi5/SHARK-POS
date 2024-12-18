import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui/card";

const Orders = () => {
  const { orders } = useSelector((store) => store.orders);
  console.log(orders);
  return (
    <div>
      <h1>Orders</h1>
      <div>
        {orders.length ? (
          orders.map((order, index) => (
            <div key={order.id}>
              <Card className="w-[300px] bg-muted">
                <CardHeader>
                  <CardTitle>Order{index + 1} </CardTitle>
                  <CardDescription>Order-id:{order.id}</CardDescription>
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
