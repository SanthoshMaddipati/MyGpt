import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community1 from "./pages/Community1";
import Loading from "./pages/Loading";
import Login from "./pages/Login";

import { assets } from "./assets/assets";
import { useAppContext } from "./context/AppContext";
import "./assets/prism.css";

const App = () => {
  const { user, loadingUser } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // While checking token / user → show loader
  if (loadingUser) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />

      {/* Mobile menu icon */}
      {!isMenuOpen && user && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer dark:invert"
          onClick={() => setIsMenuOpen(true)}
          alt="menu"
        />
      )}

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
          <div className="flex h-screen w-screen">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community1 />} />
              {/* optionally a /loading route */}
              <Route path="/loading" element={<Loading />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
