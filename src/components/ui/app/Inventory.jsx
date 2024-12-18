import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@/components/ui/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/ui/table";

import { addProduct, updateProduct } from "@/utils/productSlice";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Row from "./Row";
import AddProductRow from "./AddProductRow";

const Inventory = () => {
  const { products, brands, categories } = useSelector((store) => store.table);
  const dispatch = useDispatch();
  const [editingRow, setEditingRow] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const defaultProduct = {
    _id: "",
    name: "",
    brand: "",
    category: "",
    sku: "",
    description: "",
    variants: [{ weight: "", price: "", stock: "" }],
  };
  const [newProduct, setNewProduct] = useState(defaultProduct);
  const columns = [
    { header: "Product Name", accessorKey: "name" },
    { header: "Brand", accessorKey: "brand" },
    { header: "Category", accessorKey: "category" },
    { header: "SKU", accessorKey: "sku" },
    { header: "Description", accessorKey: "description" },
    { header: "Variants", accessorKey: "variants" },
    { header: "Actions" },
  ];

  const handleSave = (id, editedData) => {
    const updatedProduct = {
      ...products.find((product) => product._id === id),
      ...editedData,
    };
    dispatch(updateProduct(updatedProduct));
    setEditingRow(null);
  };

  const handleClick = () => {
    setIsAdd(!isAdd);
  };

  const handleNew = (key, value) => {
    setNewProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleVariantsChange = (index, key, value) => {
    setNewProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [key]: Number(value),
      };
      return { ...prev, variants: updatedVariants };
    });
  };

  const handleDeleteVariant = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = () => {
    const addedProduct = { ...newProduct, _id: uuidv4() };
    dispatch(addProduct(addedProduct));
    setIsAdd(false);
    setNewProduct(defaultProduct);
  };

  const handleCancelAddProduct = () => {
    setIsAdd(false);
    setNewProduct(defaultProduct);
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <div className="flex justify-end ml-10">
        <Button onClick={handleClick}>
          <Plus />
          Product
        </Button>
      </div>

      <div className="container mx-auto py-10">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="text-lg text-primary font-semibold"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdd && (
              <AddProductRow
                newProduct={newProduct}
                brands={brands}
                categories={categories}
                handleNew={handleNew}
                handleVariantsChange={handleVariantsChange}
                handleDeleteVariant={handleDeleteVariant}
                handleAddProduct={handleAddProduct}
                handleCancelAddProduct={handleCancelAddProduct}
                setNewProduct={setNewProduct}
              />
            )}
            {products.length ? (
              products.map((product, index) => (
                <Row
                  key={product._id}
                  row={product}
                  rowIndex={index}
                  brands={brands}
                  categories={categories}
                  isEditing={editingRow === index}
                  isAdd={isAdd}
                  setEditingRow={setEditingRow}
                  onSave={handleSave}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1}>No Products Available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inventory;
