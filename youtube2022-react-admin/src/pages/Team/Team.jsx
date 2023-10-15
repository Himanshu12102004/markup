import "./Team.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { Teamtab } from "../../components/Teamtab/Teamtab";
import { useContext } from "react";
import { MyContext } from "../../App";

const Team = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Teamtab />
      </div>
    </div>
  );
};

export default Team;
