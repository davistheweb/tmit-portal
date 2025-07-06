import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login, Register } from "./auth/pages";

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
