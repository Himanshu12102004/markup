import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Team from "./pages/Team/Team";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Settings from "./pages/settings/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, createContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Signup from "./pages/signup/Signup";
import ImageComments from "./components/ImageComments/ImageComments";
import Newt from "./pages/Newt/Newt";

export const MyContext = createContext();

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [logged, setLogged] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  return (
    <MyContext.Provider value={{currentImg, setCurrentImg}}>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home logged={logged} />} />
            <Route
              path="login"
              element={<Login logged={logged} setLogged={setLogged} />}
            />
            <Route path="ImageComments" element={<ImageComments />} />
            <Route path="newimage" element={<Newt />} />
            <Route path="settings" element={<Settings />} />
            <Route path="signup" element={<Signup />} />
            <Route path="users">
              <Route index element={<Team />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<Team />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </MyContext.Provider>
  );
}

export default App;
