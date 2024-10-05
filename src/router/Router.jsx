import { redirect } from "react-router-dom";
import swal from "sweetalert";

export async function loaderTransaction() {
  const resUser = await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/user`
  );
  const resTransaction = await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/transaction`
  );
  const user = await resUser.json();
  const transaction = await resTransaction.json();
  return { user: user, transaction: transaction };
}

export async function actionLockUser({ request }) {
  const formData = await request.formData();

  const user = {
    userId: formData.get("userId"),
    status: formData.get("status"),
  };

  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/lockUser`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );
  const message = await res.json();

  swal(`${message.message}`, `Đã khóa tài khoản ID: ${user.userId}`, "success");
  return redirect("/");
}

export async function actionDeleteHotel({ request }) {
  const formData = await request.formData();

  const hotelId = formData.get("hotelId");

  swal({
    title: `Bạn muốn xóa khách sạn`,
    text: `Hotel ID: ${hotelId}`,
    icon: "error",
    buttons: ["NO", "YES"],
  }).then((yes) => {
    if (yes) {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/deleteHotel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotelId: hotelId }),
      })
        .then((res) => res.json())
        .then((message) => {
          if (!message.ErrorMessage) {
            swal(
              `${message.message}`,
              `Đã xóa Hotel ID: ${hotelId}`,
              "success"
            ).then(() => location.replace("/hotel"));
          } else {
            swal(`${message.ErrorMessage}`, ``, "error");
          }
        });
    }
  });

  return formData;
}

export async function loaderRoom() {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/room`
  );
  const data = await res.json();
  return data;
}

export async function actionDeleteRoom({ request }) {
  const formData = await request.formData();

  const roomId = formData.get("roomId");

  swal({
    title: `Bạn muốn xóa khách sạn`,
    text: `Room ID: ${roomId}`,
    icon: "error",
    buttons: ["NO", "YES"],
  }).then((yes) => {
    if (yes) {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/admin/roomDelete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: roomId }),
      })
        .then((res) => res.json())
        .then((message) => {
          if (!message.ErrorMessage) {
            swal(
              `${message.message}`,
              `Đã xóa Room ID: ${roomId}`,
              "success"
            ).then(() => location.replace("/room"));
          } else {
            swal(`${message.ErrorMessage}`, ``, "error");
          }
        });
    }
  });

  return formData;
}
