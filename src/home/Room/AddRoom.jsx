import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./AddRoom.module.css";
import { useEffect, useState } from "react";

function AddRoom() {
  const [hotelList, setHotelList] = useState();
  const [room, setRoom] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const roomId = searchParams.get("id");

  useEffect(() => {
    async function api() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/hotel`
      );
      setHotelList(await res.json());
      if (edit) {
        const resRoom = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }/admin/editRoom?id=${roomId}`
        );
        setRoom(await resRoom.json());
      }
    }
    api();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    const room = {
      tilte: e.target.tilte.value,
      desc: e.target.desc.value,
      price: e.target.price.value,
      maxPeople: e.target.maxPeople.value,
      roomNumbers: e.target.roomNumbers.value.split(","),
      hotel: e.target.hotel.value,
    };

    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/addRoom`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: room, edit: edit, roomId: roomId }),
      }
    );
    const message = await res.json();
    if (!message.errorMessage) {
      await swal(`${message.message}`, ``, "success");
      navigate("/room");
    } else {
      await swal(`${message.errorMessage}`, ``, "error");
      e.target.roomNumbers.value == "";
    }
  }

  return (
    <div className={classes.addroom}>
      <h3>Add New Room</h3>

      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="tilte"
            value={room && room.title}
            onChange={(e) => setRoom({ ...room, title: e.target.value })}
            placeholder="2 bed Room"
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={room && room.desc}
            onChange={(e) => setRoom({ ...room, desc: e.target.value })}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="999"
            value={room && room.price}
            onChange={(e) => setRoom({ ...room, price: e.target.value })}
          />
        </div>
        <div>
          <label>Max People</label>
          <input
            type="text"
            name="maxPeople"
            placeholder="500"
            value={room && room.maxPeople}
            onChange={(e) => setRoom({ ...room, maxPeople: e.target.value })}
          />
        </div>

        <div>
          <label>Rooms</label>
          <textarea
            name="roomNumbers"
            rows="1"
            cols="50"
            value={room && room.roomNumbers.join()}
            onChange={(e) =>
              setRoom({ ...room, roomNumbers: e.target.value.split(",") })
            }
          />
        </div>
        <div>
          <label>Hotel</label>
          <select name="hotel">
            {hotelList &&
              hotelList.results.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div></div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default AddRoom;
