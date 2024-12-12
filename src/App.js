import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,  
} from "react-router-dom";
import Login from './pages/Login';
import Hero from './components/Hero';
import UserListPage from './pages/UserListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <Router>
      <ToastContainer />
      {/* <div className='flex flex-row'> */}

      {/* <Left></Left> */}

      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route path="/user" element={<UserListPage />}></Route>


      </Routes>
      
    </Router>
  );
}

export default App;
