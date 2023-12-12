import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './assets/main.css'
import Login from './pages/Login';
import Navbar from './components/common/Navbar';
import Register from './pages/Register';
import View from './pages/classes/View';
import List from './pages/classes/List';
import Enroll from './pages/classes/Enroll';
import ListClass from './pages/Instructors/List'
import Create from './pages/Instructors/Create';


function App() {
  return (
    <>
    <Navbar />
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path='/register' element={<Register />}/>
          <Route exact path='/classes/view' element={<List />}/>
          <Route exact path='/classes/view/:id' element={<View />}/>
          <Route exact path='/classes/:id/enroll' element={<Enroll />}/>
          <Route exact path='/instructors/class' element={<ListClass />}/>
          <Route exact path='/instructors/class/new' element={<Create />}/>

        </Routes>
    </>
  );
}

export default App;
