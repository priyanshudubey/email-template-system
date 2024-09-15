import "./App.css";
// import Body from "./components/Body";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Browse from "./components/Browse";
import Template from "./components/Template";
import Profile from "./components/Profile";
import PrivateRoute from "./utils/PrivateRouter";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/browse"
            element={<PrivateRoute element={<Browse />} />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/home"
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/landingPage"
            element={<PrivateRoute element={<LandingPage />} />}
          />
          <Route
            path="/templates/*"
            element={<PrivateRoute element={<Template />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/footer"
            element={<PrivateRoute element={<Footer />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
