import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./NewHotel.module.css";
import { useEffect, useState } from "react";

function NewHotel() {
  const roomList = useLoaderData();
  const [roomArr, setRoomArr] = useState([]);
  const [hotel, setHotel] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const idHotel = searchParams.get("id");

  function handleChange(e) {
    let isChecked = e.target.checked;
    const _id = e.target.value;
    if (isChecked) {
      const check = roomArr.includes(_id);
      if (!check) setRoomArr([...roomArr, _id]);
      setHotel({ ...hotel, rooms: roomArr });
    } else {
      const updateRoom = roomArr.filter((e) => e !== _id);
      setRoomArr(updateRoom);
      setHotel({ ...hotel, rooms: roomArr });
    }
  }
  useEffect(() => {
    if (edit) {
      async function api() {
        const res = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }/admin/hotelEdit?id=${idHotel}`
        );
        setHotel(await res.json());
      }
      api();
    }
  }, []);
  useEffect(() => {
    if (hotel) {
      setRoomArr(hotel.rooms);
    }
  }, [hotel]);

  async function onSubmit(e) {
    e.preventDefault();

    const hotel = {
      name: e.target.name.value,
      type: e.target.type.value,
      city: e.target.city.value,
      address: e.target.address.value,
      distance: e.target.distance.value,
      photos: e.target.photos.value.split(","),
      desc: e.target.desc.value,
      featured: e.target.featured.value,
      rooms: roomArr,
      rating: 0,
    };

    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/hotel`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotel: hotel, edit: edit, hotelId: idHotel }),
      }
    );
    const message = await res.json();
    if (message) {
      await swal(`${message.message}`, ``, "success");
      navigate("/hotel");
    }
  }

  return (
    <div className={classes.newHotel}>
      <h3>Add New Hotel</h3>

      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="My Hotel"
            value={hotel && hotel.name}
            onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
          />
        </div>
        <div>
          <label>Type</label>
          <select name="type">
            <option value="">Select Type</option>
            <option selected={hotel && hotel.type == "hotel"} value="hotel">
              Hotel
            </option>
            <option
              selected={hotel && hotel.type == "apartments"}
              value="apartments"
            >
              Apartments
            </option>
            <option selected={hotel && hotel.type == "resorts"} value="resorts">
              Resorts
            </option>
            <option selected={hotel && hotel.type == "villas"} value="villas">
              Villas
            </option>
            <option selected={hotel && hotel.type == "cabins"} value="cabins">
              Cabins
            </option>
          </select>
        </div>
        <div>
          <label>City</label>
          <input
            value={hotel && hotel.city}
            onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
            type="text"
            name="city"
            placeholder="Ho Chi Minh"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            value={hotel && hotel.address}
            onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
            type="text"
            name="address"
            placeholder="69 st.69"
          />
        </div>
        <div>
          <label>Distance from City Center</label>
          <input
            value={hotel && hotel.distance}
            onChange={(e) => setHotel({ ...hotel, distance: e.target.value })}
            type="text"
            name="distance"
            placeholder="500"
          />
        </div>
        <div>
          <label>Description</label>
          <input
            value={hotel && hotel.desc}
            onChange={(e) => setHotel({ ...hotel, desc: e.target.value })}
            type="text"
            name="desc"
            placeholder="Description"
          />
        </div>
        <div>
          <label>photos</label>
          <textarea
            name="photos"
            rows="2"
            cols="50"
            onChange={(e) =>
              setHotel({ ...hotel, photos: e.target.value.split(",") })
            }
            value={hotel && hotel.photos.join()}
          />
        </div>
        <div>
          <label>Featured</label>
          <select name="featured">
            <option value="">Select</option>
            <option selected={hotel && hotel.featured == true} value={true}>
              YES
            </option>
            <option selected={hotel && hotel.featured == false} value={false}>
              NO
            </option>
          </select>
        </div>
        <div></div>
        <div className={classes.room}>
          <label>Rooms</label>
          <ul>
            {roomList &&
              roomList.map((e) => (
                <li key={e._id}>
                  <label>
                    <input
                      name={e.title}
                      onClick={(e) => handleChange(e)}
                      type="checkbox"
                      value={e._id}
                      checked={hotel && hotel.rooms.find((id) => id == e._id)}
                    />
                    {e.title}
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default NewHotel;
