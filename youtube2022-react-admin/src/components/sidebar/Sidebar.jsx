import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Dropdown } from "../dropdown/dropdown";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [openprofile, useopenprofile] = useState(false);
  return (
    <div className="sidebar">
      <div className="top">
        <div className="navbar-logo">
          <a href="/">
            <img src="images/logo.png" alt="Logo" />
          </a>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Markup</span>
        </Link>
      </div>

      <hr />
      <button
        className="initialworkspace"
        onClick={() => useopenprofile(!openprofile)}
      >
        Workspace Name
      </button>

      {openprofile && <Dropdown />}

      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li className="users sidebar_text">
              <StoreIcon className="icon" />
              <span>
                {' '}
                <h3>Dashboard</h3>
              </span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <li className="sidebar_text">
              <PersonOutlineIcon className="icon" />
              <span>
                <h3>Team</h3>
              </span>
            </li>
          </Link>
          <Link to="/settings" style={{ textDecoration: 'none' }}>
            <li className="sidebar_text">
              <SettingsApplicationsIcon className="icon" />
              <span>
                <h3>Settings</h3>
              </span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <button>Live Chat</button>
        <button>Help Center</button>
      </div>
    </div>
  )
};

export default Sidebar;
