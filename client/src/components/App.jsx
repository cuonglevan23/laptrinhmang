import React from "react";

import { Routes, Route } from "react-router-dom";

// components
import Header from "./Header";
import Sidebar from "./Sidebar";

// pages
import Home from "../page/Home";
import Room from "../page/Room";
import NotFound from "../page/NotFound";
import UploadFile from "../page/UploadFile";
import  Calendar from "../page/Schedule";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="max-h-screen overflow-auto w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomID" element={<Room />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/schedule" element={<Calendar/>}/>
          <Route path="/uploadfile" element={<UploadFile />} />
        </Routes>
      </div>Í
    </div>
  );
};

export default App;
