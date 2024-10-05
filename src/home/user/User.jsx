import { useEffect, useState } from "react";
import classes from "./User.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-router-dom";

function User() {
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState();

  useEffect(() => {
    async function api() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/userList`
      );
      setUserList(await res.json());
    }
    api();
  }, [page]);
  return (
    <div className={classes.user}>
      <h3>User List</h3>
      {userList && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Full Name</th>
                <th>phoneNumber</th>
                <th>email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.results.map((e, i) => (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.username}</td>
                  <td>{e.fullName}</td>
                  <td>{e.phoneNumber}</td>
                  <td>{e.email}</td>
                  <td>
                    <span className={classes[e.status.toLowerCase()]}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <Form method="POST">
                      <input type="hidden" name="userId" value={e._id} />
                      <input
                        type="hidden"
                        name="status"
                        value={e.status == "Locked" ? "Unlock" : "Locked"}
                      />
                      <button
                        className={classes[e.status.toLowerCase()]}
                        type="submit"
                      >
                        {e.status == "Locked" ? "Unlock" : "Lock"}
                      </button>
                    </Form>
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
              {userList.total_pages}
            </button>
            <button
              disabled={page == userList.total_pages && "disabled"}
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

export default User;
