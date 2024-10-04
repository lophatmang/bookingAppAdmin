import { Navigate, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const data = useLoaderData();

  function changTime(date) {
    const day = new Date(date.slice(0, 10));
    return day.getTime();
  }

  const earning = data.transaction
    .filter((e) => e.status == "Checkout")
    .reduce((cur, e) => cur + e.price, 0);

  function balance() {
    const sort = data.transaction
      .sort((a, b) => changTime(b.dateEnd) - changTime(a.dateEnd))
      .filter((e) => e.status == "Checkout");

    if (sort.length !== 0) {
      const count =
        sort[0].dateEnd.slice(5, 7) -
        sort[sort.length - 1].dateEnd.slice(5, 7) +
        1;

      const balanceTotal = sort.reduce((cur, e) => cur + e.price, 0);
      return balanceTotal / count;
    } else {
      return 0;
    }
  }

  return (
    <div className={classes.home}>
      {data && (
        <div className={classes.quantity}>
          <div>
            <span>USERS</span>
            <h3>{data.user.length}</h3>
            <FontAwesomeIcon
              style={{ color: "red", backgroundColor: "#ff00002f" }}
              icon="fa-solid fa-user"
            />
          </div>
          <div>
            <span>ORDERS</span>
            <h3>{data.transaction.length}</h3>
            <FontAwesomeIcon
              style={{ color: "gold", backgroundColor: "#ffd9004e" }}
              icon="fa-solid fa-cart-shopping"
            />
          </div>
          <div>
            <span>EARNINGS</span>
            <h3>{`$ ${earning}`}</h3>
            <FontAwesomeIcon
              style={{ color: "green", backgroundColor: "#0080003e" }}
              icon="fa-solid fa-dollar-sign"
            />
          </div>
          <div>
            <span>BALANCE</span>
            <h3>{`$ ${balance()}`}</h3>
            <FontAwesomeIcon
              style={{ color: "purple", backgroundColor: "#80008037" }}
              icon="fa-solid fa-wallet"
            />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Home;
