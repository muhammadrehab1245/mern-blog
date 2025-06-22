// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <Router>
      <AuthProvider>
         {/* <Navbar />  */}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Route>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;