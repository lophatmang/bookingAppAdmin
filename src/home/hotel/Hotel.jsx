import { useEffect, useState } from "react";
import classes from "./Hotel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Link } from "react-router-dom";

function Hotel() {
  const [hotel, setHotel] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function api() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/hotel?page=${page}`
      );
      setHotel(await res.json());
    }
    api();
  }, [page]);

  return (
    <div className={classes.hotel}>
      <h3>Hotel List</h3>
      <Link to="/newHotel" className={classes.add}>
        Add New
      </Link>
      {hotel && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>City</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hotel.results.map((e) => (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.name}</td>
                  <td>{e.type}</td>
                  <td>{e.city}</td>
                  <td>
                    <Form method="POST">
                      <input type="hidden" name="hotelId" value={e._id} />
                      <button type="submit">Delete</button>
                    </Form>
                  </td>
                  <td>
                    <form>
                      <Link to={`/newHotel?edit=true&id=${e._id}`}>
                        <button
                          style={{ color: "green", border: "1px solid green" }}
                        >
                          Edit
                        </button>
                      </Link>
                    </form>
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
            <button style={{ cursor: "default" }}>{hotel.total_pages}</button>
            <button
              disabled={page == hotel.total_pages && "disabled"}
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

export default Hotel;
