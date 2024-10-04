import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/Redux";

function Navbar() {
  const dispatch = useDispatch();
  return (
    <div className={classes.navbar}>
      <h6>MAIN</h6>
      <NavLink to="/" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-house" />
        <span>Dashboard</span>
      </NavLink>
      <h6>LISTS</h6>
      <NavLink to="/user" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-user" />
        <span>User</span>
      </NavLink>
      <NavLink to="/hotel" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-shop" />
        <span>Hotels</span>
      </NavLink>
      <NavLink to="/room" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-bath" />
        <span>Rooms</span>
      </NavLink>
      <NavLink to="/transaction" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-truck" />
        <span>Transactions</span>
      </NavLink>
      <h6>NEW</h6>
      <NavLink to="/newHotel" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-shop" />
        <span>New Hotel</span>
      </NavLink>
      <NavLink to="/newRoom" className={classes.icon}>
        <FontAwesomeIcon icon="fa-solid fa-bath" />
        <span>New Room</span>
      </NavLink>
      <h6>USER</h6>
      <NavLink
        onClick={() => dispatch(userSlice.actions.onLogout())}
        className={classes.icon}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
        <span>Logout</span>
      </NavLink>
    </div>
  );
}

export default Navbar;
