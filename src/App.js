import "./App.css";
import Appbar from "./components/Appbar";
import ToDoList from "./components/ToDoList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./page/Edit";
import Login from "./components/Login";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ToDoList />} />
          <Route exact path="/edittodo/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}
