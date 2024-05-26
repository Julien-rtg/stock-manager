import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ProductList } from "./components/dashboard/product/ProductList.tsx";
import StockList from "./components/dashboard/stock/StockList.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard.tsx";
import { Home } from "./components/dashboard/home/Home.tsx";
import OrderList from "./components/dashboard/order/OrderList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard template={<Home />} />,
  },
  {
    path: "/stock-list",
    element: <Dashboard template={<StockList />} />,
  },
  {
    path: "/product-list",
    element: <Dashboard template={<ProductList />} />,
  },
  {
    path: "/order-list",
    element: <Dashboard template={<OrderList />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
