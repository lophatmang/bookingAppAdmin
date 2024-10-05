import { useEffect, useState } from "react";
import classes from "./Transaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Transaction() {
  const [transaction, setTransaction] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function api() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/order?page=${page}`
      );
      setTransaction(await res.json());
    }
    api();
  }, [page]);

  function changDate(date) {
    const day = new Date(date.slice(0, 10));
    return day.toLocaleDateString("en-GB");
  }

  return (
    <div className={classes.trans}>
      <h3>Latest Transactions</h3>
      {transaction && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transaction.results.map((e, i) => (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.userId.username}</td>
                  <td>{e.hotel.name}</td>
                  <td>{e.room.toString()}</td>
                  <td>
                    {changDate(e.dateStart)} - {changDate(e.dateEnd)}
                  </td>
                  <td>${e.price}</td>
                  <td>{e.payment == "Credit" ? "Credit Card" : e.payment}</td>
                  <td>
                    <span className={classes[e.status.toLowerCase()]}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.buttonPage}>
            <button
              disabled={page == 1 && "disabled"}
              onClick={() => setPage(page - 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-caret-left" />
            </button>
            <button style={{ cursor: "default" }}>{page}</button>
            <button style={{ cursor: "default" }}>{` / `}</button>
            <button style={{ cursor: "default" }}>
              {transaction.total_pages}
            </button>
            <button
              disabled={page == transaction.total_pages && "disabled"}
              onClick={() => setPage(page + 1)}
            >
              <FontAwesomeIcon icon="fa-solid fa-caret-right" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Transaction;
