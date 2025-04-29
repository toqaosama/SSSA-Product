import "./App.css";
import { Outlet } from "react-router-dom";
import HeaderUser from "./Shared/Header";
import Footer from "./Shared/Footer";
import {AuthProvider} from "./Context/AuthContext.js";

const App = () => {
  return (
    <AuthProvider>
      <HeaderUser />
      <Outlet /> {/* This ensures your pages load here */}
      <Footer />
    </AuthProvider>
  );
};

export default App;
