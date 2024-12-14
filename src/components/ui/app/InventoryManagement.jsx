import { Pencil, Save, X } from "lucide-react";
import { Button } from "../button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "@/hooks/useProducts";
import { useState } from "react";
import { Input } from "../input";
import { updateProduct } from "@/utils/productSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

const InventoryManagement = () => {
  const { loading, error } = useProducts();
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const dispatch = useDispatch();
  const { products, brands, categories } = useSelector((store) => store.table);

  console.log("Component re-rendering");

  const columns = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        return (
          <div className="capitalize">
            {isEditing ? (
              <Input
                value={editedData.name || row.getValue("name")}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
            ) : (
              row.getValue("name")
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "brand",
      header: " Brand",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        return (
          <div className="capitalize">
            {isEditing ? (
              <Select
                value={editedData.brand || row.getValue("brand")}
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
              row.getValue("brand")
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        return (
          <div className="capitalize">
            {isEditing ? (
              <Select
                value={editedData.category || row.getValue("category")}
                onValueChange={(value) =>
                  setEditedData({ ...editedData, category: value })
                }
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
            ) : (
              row.getValue("category")
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        return (
          <div className="capitalize">
            {isEditing ? (
              <Input
                value={editedData.sku || row.getValue("sku")}
                onChange={(e) =>
                  setEditedData({ ...editedData, sku: e.target.value })
                }
              />
            ) : (
              row.getValue("sku")
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        return (
          <div className="capitalize">
            {isEditing ? (
              <Input
                value={editedData.description || row.getValue("description")}
                onChange={(e) =>
                  setEditedData({ ...editedData, description: e.target.value })
                }
              />
            ) : (
              row.getValue("description")
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "variants",
      header: "Variants",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        const variants = editedData.variants || row.getValue("variants");
        return (
          <div className="space-y-1">
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
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const isEditing = editingRow === row.index;
        return (
          <div>
            {isEditing ? (
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-green-600"
                  onClick={() => {
                    dispatch(updateProduct({ ...row.original, ...editedData }));
                    console.log(editedData);
                    setEditingRow(null);
                    setEditedData({});
                  }}
                >
                  <Save />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-600"
                  onClick={() => {
                    setEditingRow(null);
                    setEditedData({});
                  }}
                >
                  <X />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditingRow(row.index);
                  setEditedData(row.original);
                }}
              >
                <Pencil />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Inventory Management</h1>
      <div className="container mx-auto py-10">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-lg text-primary font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-lg">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryManagement;
