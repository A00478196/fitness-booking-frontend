import logo from "./logo.svg";
// import './App.css';
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/main.css";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import Register from "./pages/Register";
import View from "./pages/classes/View";
import List from "./pages/classes/List";
import Enroll from "./pages/classes/Enroll";
import ListClass from "./pages/Instructors/List";
import Create from "./pages/Instructors/Create";
import Home from "./pages/Home";
import Programs from "./pages/programs/Programs";
import ProgramClass from "./pages/programs/Classes";
import Profile from "./pages/Profile";
import Edit from "./pages/Instructors/Edit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/classes/view" element={<List />} />
        <Route exact path="/classes/view/:id" element={<View />} />
        <Route exact path="/classes/:id/enroll" element={<Enroll />} />
        <Route exact path="/instructors/class" element={<ListClass />} />
        <Route exact path="/instructors/class/new" element={<Create />} />
        <Route exact path="/programs" element={<Programs />} />
        <Route exact path="/programs/:id/classes" element={<ProgramClass />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/classes/edit/:id" element={<Edit />}/>
      </Routes>
    </>
  );
}

export default App;
