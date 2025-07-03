import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "./auth/Login";

const App: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
