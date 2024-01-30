import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import {
  useCatrgoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const dispatch = useDispatch();
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCatrgoriesQuery("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [maxPriceText, setMaxPriceText] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    page,
    category,
    price: maxPrice,
  });

  // console.log(searchedData);

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const isNextPage = page < searchedData?.totalPage!;
  const isPrevPage = page > 1;

  if (isError) toast.error((error as CustomError).data.message);
  if (productIsError) toast.error((productError as CustomError).data.message);

  useEffect(() => {
    const delayDebounceFun = setTimeout(() => {
      setSearch(searchText);
      // console.log(search);
    }, 500);
    return () => clearTimeout(delayDebounceFun);
  }, [searchText]);

  useEffect(() => {
    const delayDebounceFun = setTimeout(() => {
      setMaxPrice(maxPriceText);
    }, 100);
    return () => clearTimeout(delayDebounceFun);
  }, [maxPriceText]);
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
            value={maxPriceText}
            onChange={(e) => setMaxPriceText(Number(e.target.value))}
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="searchProductList">
            {!productLoading &&
              searchedData?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))}
          </div>
        )}

        {searchedData?.totalPage! > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              prev
            </button>
            <span>
              {page} of {searchedData?.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
