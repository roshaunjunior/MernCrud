import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import ShowData from "./components/ShowData";
import CreateData from "./components/CreateData";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useState } from "react";
import UpdateData from "./components/UpdateData";

function App() {
  const [input, setInput] = useState({});
  const [uId, setUId] = useState("");
  //const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const createApi = () => {
    fetch(`http://localhost:8000/create`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  };

  const editApi = async (id) => {
    var data = await fetch(`http://localhost:8000/get/${id}`);
    data = await data.json();
    setInput(data);
    setUId(id);
    console.log(data);
  };

  const updateApi = async () => {
    var data = await fetch(`http://localhost:8000/put/${uId}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    data = await data.json();
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show" element={<ShowData editApi={editApi} />} />
          <Route
            path="/create"
            element={
              <CreateData
                handleChange={handleChange}
                input={input}
                createApi={createApi}
              />
            }
          />
          <Route
            path="/update"
            element={
              <UpdateData
                handleChange={handleChange}
                input={input}
                updateApi={updateApi}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
