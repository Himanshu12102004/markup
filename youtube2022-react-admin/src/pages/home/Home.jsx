import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { Workspace } from "../../components/workspace/Workspace";


const Home = ({logged}) => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">

        <div className="navbar"><Navbar logged={logged}
        /></div>

        <div className="workspace"> <Workspace /></div>
        
      </div>
    </div>
  );
};

export default Home;
