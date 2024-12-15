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
import { addProduct, updateProduct } from "@/utils/productSlice";
import { Pencil, Plus, Save, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

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
    console.log("Updated Product:", updatedProduct);
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

  const handleAddProduct = async () => {
    //     try {
    //       const response = await fetch(
    //         "http://3.110.165.57:3000/api/createproduct",
    //         {
    //           method: "POST",
    //           body: JSON.stringify(newProduct),
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       const addedProduct = await response.json();
    //       dispatch(addProduct(addedProduct));
    //       setIsAdd(false);
    //       setNewProduct({
    //         name: "",
    //         brand: "",
    //         category: "",
    //         description: "",
    //         sku: "",
    //         modelNumber: "",
    //         supplier: "",
    //         warranty: "",
    //         variants: [{ weight: "", price: "", stock: "" }],
    //       });
    //     } catch (error) {
    //       console.error("Error adding product", error);
    //     }

    const addedProduct = { ...newProduct, _id: uuidv4() };

    dispatch(addProduct(addedProduct));

    setIsAdd(false);
    setNewProduct(defaultProduct);
  };

  const handleCancelAddProduct = () => {
    setIsAdd(false);
    setNewProduct(defaultProduct);
  };
  console.log(products);

  return (
    <div>
      <h1 className="text-4xl my-10">Inventory Management</h1>
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
              <TableRow>
                <TableCell>
                  <Input
                    value={newProduct.name}
                    onChange={(e) => handleNew("name", e.target.value)}
                    placeholder="Product Name"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={newProduct.brand}
                    onValueChange={(value) => handleNew("brand", value)}
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
                </TableCell>
                <TableCell>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => handleNew("category", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
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
                </TableCell>
                <TableCell>
                  <Input
                    value={newProduct.sku}
                    onChange={(e) => handleNew("sku", e.target.value)}
                    placeholder="SKU"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={newProduct.description}
                    onChange={(e) => handleNew("description", e.target.value)}
                    placeholder="Description"
                  />
                </TableCell>
                <TableCell>
                  {newProduct.variants.map((variant, index) => (
                    <div key={index} className="flex space-x-1 space-y-1">
                      <Input
                        value={variant.price}
                        onChange={(e) =>
                          handleVariantsChange(index, "price", e.target.value)
                        }
                        placeholder="Price"
                      />
                      <Input
                        value={variant.stock}
                        onChange={(e) =>
                          handleVariantsChange(index, "stock", e.target.value)
                        }
                        placeholder="Stock"
                      />
                      <Input
                        value={variant.weight}
                        onChange={(e) =>
                          handleVariantsChange(index, "weight", e.target.value)
                        }
                        placeholder="Weight"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600"
                        onClick={() => handleDeleteVariant(index)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                  <div>
                    <Button
                      className="rounded-full size-5 "
                      size="icon"
                      onClick={() =>
                        setNewProduct((prev) => ({
                          ...prev,
                          variants: [
                            ...prev.variants,
                            { price: "", stock: "", weight: "" },
                          ],
                        }))
                      }
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={handleAddProduct}
                    variant="outline"
                    size="icon"
                    className="text-green-600"
                  >
                    <Save />
                  </Button>
                  <Button
                    onClick={handleCancelAddProduct}
                    variant="outline"
                    size="icon"
                    className="text-red-600"
                  >
                    <X />
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {products.map((product, index) => (
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

    const variants = editedData.variants || row.variants;

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
          {isEditing
            ? variants?.map((variant, index) => (
                <div key={variant._id || index}>
                  <h1>Variant:{index + 1}</h1>
                  <p>Price:</p>
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        variants: variants.map((v, i) =>
                          i === index
                            ? { ...v, price: Number(e.target.value) }
                            : v
                        ),
                      })
                    }
                    placeholder="Price"
                  />
                  <p>Stock:</p>
                  <Input
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        variants: variants.map((v, i) =>
                          i === index
                            ? { ...v, stock: Number(e.target.value) }
                            : v
                        ),
                      })
                    }
                    placeholder="Stock"
                  />
                  <p>Weight:</p>
                  <Input
                    type="number"
                    value={variant.weight}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        variants: variants.map((v, i) =>
                          i === index
                            ? { ...v, weight: Number(e.target.value) }
                            : v
                        ),
                      })
                    }
                    placeholder="Weight"
                  />
                </div>
              ))
            : variants?.map((variant, index) => (
                <div key={variant._id || index}>
                  {`Price: ${variant.price}, Stock: ${variant.stock}, Weight: ${variant.weight}`}
                </div>
              ))}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <>
              <Button
                onClick={() => onSave(row._id, editedData)}
                variant="outline"
                size="icon"
                className="text-green-600"
              >
                <Save />
              </Button>
              <Button
                onClick={() => setEditingRow(null)}
                variant="outline"
                size="icon"
                className="text-red-600"
              >
                <X />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setEditingRow(rowIndex)}
              variant="outline"
              size="icon"
            >
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
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,
  brands: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEditing: PropTypes.bool.isRequired,
  setEditingRow: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Inventory;
