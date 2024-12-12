import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

const Categories = () => {
  const categories = useSelector((state) => state.table?.categories);
  return (
    <div>
      <h1>Categories </h1>
      <div className="container py-10 w-4/6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-primary text-lg">
                Categories
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length ? (
              categories.map((brand, index) => (
                <TableRow key={index}>
                  <TableCell>{brand}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1}>No categories Available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
