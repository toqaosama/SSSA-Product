import "./App.css";
import { Outlet } from "react-router-dom";
import HeaderUser from "./Shared/Header";
import Footer from "./Shared/Footer";
import {AuthProvider} from "./Context/AuthContext.js";

const App = () => {
  return (
      <>
      <HeaderUser />
      <Outlet /> {/* This ensures your pages load here */}
      <Footer />
      </>
  );
};

export default App;
