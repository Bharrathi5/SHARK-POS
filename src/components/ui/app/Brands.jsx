import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Brands = () => {
  const brands = useSelector((state) => state.table?.brands);
  return (
    <div>
      <h1>Brands</h1>
      <div className="container py-10 w-4/6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-primary text-lg">
                Brands
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length ? (
              brands.map((brand, index) => (
                <TableRow key={index}>
                  <TableCell>{brand}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1}>No Brands Available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Brands;
