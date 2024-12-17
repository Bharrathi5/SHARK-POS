import PropTypes from "prop-types";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Input } from "../input";
import { Button } from "../button";
import { Pencil, Save, X } from "lucide-react";
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
              value={editedData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Select
              value={editedData.brand || ""}
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
              value={editedData.category || ""}
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
              value={editedData.sku || ""}
              onChange={(e) => handleChange("sku", e.target.value)}
            />
          ) : (
            row.sku
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={editedData.description || ""}
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
                    value={variant.price || ""}
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
                    value={variant.stock || ""}
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
                    value={variant.weight || ""}
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
              onClick={() => {
                setEditingRow(rowIndex);
                setEditedData(row);
              }}
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

export default Row;
