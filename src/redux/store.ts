import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { productAPI } from "./api/productAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderAPI.middleware
    ),
});
