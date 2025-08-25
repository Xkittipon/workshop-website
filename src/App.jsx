//rafce
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  //javascript

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
