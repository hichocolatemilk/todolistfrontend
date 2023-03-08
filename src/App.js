import "./App.css";
import Appbar from "./components/Appbar";
import ToDoList from "./components/ToDoList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Edit from "./page/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route exact path="/edittodo/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
