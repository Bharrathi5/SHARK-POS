import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setProducts } from "@/utils/productSlice";

const useProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://3.110.165.57:3000/api/getproducts");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { loading, error };
};

export default useProducts;
