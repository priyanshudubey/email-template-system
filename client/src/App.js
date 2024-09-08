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
            path="/template"
            element={<PrivateRoute element={<Template />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
