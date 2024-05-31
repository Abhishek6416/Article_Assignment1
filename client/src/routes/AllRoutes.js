import { Routes, Route } from "react-router-dom";
import Login_Signup from "../pages/Login_Signup";
import PrivateRoutes from "./PrivateRoutes";

import Navbar from "../components/Navbar";

import Form from "../pages/Form";
import AllArticle from "../pages/All_Articles";
import ViewArticle from "../pages/ViewArticle";
const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register-login" element={<Login_Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/" element={<AllArticle />} />
          <Route path="/view/:id" element={<ViewArticle />} />
        </Route>
      </Routes>
    </>
  );
};
export default AllRoutes;
