import { Provider } from "react-redux";
import "./App.css";
import Login from "./login/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { store } from "./redux/Redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./home/homePage/Home";
import PageNotFound from "./pageNotFound/PageNotFound";
import {
  actionDeleteHotel,
  actionDeleteRoom,
  actionLockUser,
  loaderRoom,
  loaderTransaction,
} from "./router/Router";
import Transaction from "./home/homePage/Transaction";
import Hotel from "./home/hotel/Hotel";
import User from "./home/user/User";
import NewHotel from "./home/hotel/NewHotel";
import Room from "./home/Room/Room";
import AddRoom from "./home/Room/AddRoom";
import TransactionAll from "./home/transaction/TransactionAll";
library.add(fas);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Home />,
        loader: loaderTransaction,
        children: [
          {
            path: "/",
            element: <Transaction />,
          },
        ],
      },
      {
        path: "/hotel",
        element: <Hotel />,
        action: actionDeleteHotel,
      },
      {
        path: "/user",
        element: <User />,
        action: actionLockUser,
      },
      {
        path: "/newHotel",
        element: <NewHotel />,
        loader: loaderRoom,
      },
      {
        path: "/room",
        element: <Room />,
        action: actionDeleteRoom,
      },
      {
        path: "/newRoom",
        element: <AddRoom />,
      },
      {
        path: "/transaction",
        element: <TransactionAll />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
