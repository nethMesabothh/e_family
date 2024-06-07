import { FilterProduct } from "@/components/filter/filter-product";
import Product from "@/components/main/product/product";
import { SearchProduct } from "@/components/search/search-product";
import { SearchParamProps } from "@/types";

const Home = ({ searchParams }: SearchParamProps) => {
  return (
    <div className="container">
      <div className="sm:flex items-center gap-4 justify-center">
        <FilterProduct />
        <SearchProduct />
      </div>
      <Product
        categoryId={searchParams?.categoryId}
        searchQuery={searchParams?.searchQuery}
      />
    </div>
  );
};

export default Home;
