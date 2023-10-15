import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../profile/profile";
import axios from "axios";

const Navbar = ({ logged }) => {
  const navigate  = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const [a, b] = useState(false);
  const handleLogout = async () => {
    console.log("pro logout");
   localStorage.removeItem('token');
   navigate('/login');
  };
  return (
    <div className="item">
      <div className="dropdown_menu">
        <a href="/login">
          {!logged && (
            <button className="avatar" onClick={() => b(!a)}>
              Login
            </button>
          )}
        </a>

        {logged && (
          <div class="drop_menu">
            <button id="userButton">User</button>
            <div class="dropdown-content">
              <button>Your Profile</button>
              <button id="signOutButton" onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  )
};

export default Navbar;
