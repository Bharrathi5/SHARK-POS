import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Save, X } from "lucide-react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "../ui/table";

const AddProductRow = ({
  newProduct,
  brands,
  categories,
  handleNew,
  handleVariantsChange,
  handleDeleteVariant,
  handleAddProduct,
  handleCancelAddProduct,
  setNewProduct,
}) => {
  return (
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
            className="rounded-full size-5"
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
  );
};

AddProductRow.propTypes = {
  newProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.string.isRequired,
        stock: PropTypes.string.isRequired,
        weight: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  brands: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleNew: PropTypes.func.isRequired,
  handleVariantsChange: PropTypes.func.isRequired,
  handleDeleteVariant: PropTypes.func.isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  handleCancelAddProduct: PropTypes.func.isRequired,
  setNewProduct: PropTypes.func.isRequired,
};

export default AddProductRow;
