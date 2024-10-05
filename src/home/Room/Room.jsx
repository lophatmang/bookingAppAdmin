import { useEffect, useState } from "react";
import classes from "./Room.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Link } from "react-router-dom";

function Room() {
  const [room, setRoom] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function api() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/roomAll?page=${page}`
      );
      setRoom(await res.json());
    }
    api();
  }, [page]);

  return (
    <div className={classes.room}>
      <h3>Hotel List</h3>
      <Link to="/newRoom" className={classes.add}>
        Add New
      </Link>
      {room && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Max People</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {room.results.map((e) => (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.title}</td>
                  <td>{e.desc}</td>
                  <td>{e.price}</td>
                  <td>{e.maxPeople}</td>
                  <td>
                    <Form method="POST">
                      <input type="hidden" name="roomId" value={e._id} />
                      <button type="submit">Delete</button>
                    </Form>
                  </td>
                  <td>
                    <form>
                      <Link to={`/newRoom?edit=true&id=${e._id}`}>
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
            <button style={{ cursor: "default" }}>{room.total_pages}</button>
            <button
              disabled={page == room.total_pages && "disabled"}
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

export default Room;
