import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ShowData(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const showApi = async () => {
    fetch("http://localhost:8000/show")
      .then((res) => res.json())
      .then((item) => {
        setData(item);
      });
  };
  const delApi = async (id) => {
    var data = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
    });
    data = await data.json();
    showApi();
  };

  useEffect(() => {
    showApi();
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>CITY</th>
          <th>EMAIL</th>
        </tr>
        {data.map((ele) => {
          return (
            <tr>
              <td>{ele._id}</td>
              <td>{ele.name}</td>
              <td>{ele.city}</td>
              <td>{ele.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    props.editApi(ele._id);
                    navigate("/update");
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => delApi(ele._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ShowData;
