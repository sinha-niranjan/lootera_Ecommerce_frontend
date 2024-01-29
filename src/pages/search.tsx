import { useState } from "react";
import ProductCard from "../components/productCard";
import { useCatrgoriesQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCatrgoriesQuery("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};

  const isNextPage = page < 4;
  const isPrevPage = page > 1;

  if (isError) toast.error((error as CustomError).data.message);

  return (
    <div className="productSearchPage">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High) </option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={1000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select value={sort} onChange={(e) => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name.... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="searchProductList">
          <ProductCard
            productId="dfsdfsd"
            name="Macbook"
            price={300000}
            stock={34}
            handler={addToCartHandler}
            photo={
              "data:image/jpeg;base64,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"
            }
          />
        </div>

        <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
