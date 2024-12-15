import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { updateProduct } from "@/utils/productSlice";
import { Pencil, Save, X } from "lucide-react";

const Inventory = () => {
  const { products, brands, categories } = useSelector((store) => store.table);
  const dispatch = useDispatch();
  const [editingRow, setEditingRow] = useState(null);

  const handleSave = (id, editedData) => {
    const updatedProduct = {
      ...products.find((product) => product._id === id),
      ...editedData,
    };

    dispatch(updateProduct(updatedProduct));
    console.log("Updated Product:", updatedProduct);

    setEditingRow(null);
  };

  const columns = [
    { header: "Product Name", accessorKey: "name" },
    { header: "Brand", accessorKey: "brand" },
    { header: "Category", accessorKey: "category" },
    { header: "SKU", accessorKey: "sku" },
    { header: "Description", accessorKey: "description" },
    { header: "Actions" },
  ];

  return (
    <div>
      <h1>Inventory Management</h1>
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
            {products.map((product, index) => (
              <Row
                key={product._id}
                row={product}
                rowIndex={index}
                brands={brands}
                categories={categories}
                isEditing={editingRow === index}
                setEditingRow={setEditingRow}
                onSave={handleSave}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Row = React.memo(
  ({ row, rowIndex, brands, categories, isEditing, setEditingRow, onSave }) => {
    const [editedData, setEditedData] = useState({});

    const handleChange = (key, value) => {
      setEditedData((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <TableRow>
        <TableCell>
          {isEditing ? (
            <Input
              value={editedData.name || row.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Select
              value={editedData.brand || row.brand}
              onValueChange={(value) =>
                setEditedData({ ...editedData, brand: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brand</SelectLabel>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            row.brand
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Select
              value={editedData.category || row.category}
              onValueChange={(value) =>
                setEditedData({ ...editedData, category: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            row.category
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={editedData.sku || row.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
            />
          ) : (
            row.sku
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={editedData.description || row.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          ) : (
            row.description
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <>
              <Button
                onClick={() => onSave(row._id, editedData)}
                className="mr-2"
                variant="primary"
              >
                <Save />
              </Button>
              <Button onClick={() => setEditingRow(null)} variant="ghost">
                <X />
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditingRow(rowIndex)} variant="secondary">
              <Pencil />
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }
);

Row.displayName = "Row";

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,
  brands: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditing: PropTypes.bool.isRequired,
  setEditingRow: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Inventory;
