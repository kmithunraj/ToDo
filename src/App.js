import Body from './components/body/body';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/" element={<Body />}/>
        <Route exact path="/logout" element={<Logout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
