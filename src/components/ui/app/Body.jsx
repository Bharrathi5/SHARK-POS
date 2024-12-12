import { Route, Routes } from "react-router-dom";
import Suppliers from "./Suppliers";
import Brands from "./Brands";
import Categories from "./Categories";
import Orders from "./Orders";
import InventoryManagement from "./InventoryManagement";
import PointOfSale from "./PointOfSale";
import useProducts from "@/hooks/useProducts";

const Body = () => {
  useProducts();
  return (
    <div className="flex-col w-full pl-5 pr-10">
      <Routes>
        <Route path="/" element={<PointOfSale />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
    </div>
  );
};

export default Body;
