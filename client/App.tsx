import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./src/pages/Home/Home";
import { HostLobby } from "./src/pages/Lobby/HostLobby";
import { JoinLobby } from "./src/pages/Lobby/JoinLobby";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<HostLobby />} />
          <Route path="/join" element={<JoinLobby />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;