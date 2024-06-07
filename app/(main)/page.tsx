import { FilterProduct } from "@/components/filter/filter-product";
import Product from "@/components/main/product/product";
import { SearchParamProps } from "@/types";

const Home = ({ searchParams }: SearchParamProps) => {
  return (
    <div className="container">
      <FilterProduct />
      <Product categoryId={searchParams?.categoryId} />
    </div>
  );
};

export default Home;
