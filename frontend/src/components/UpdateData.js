import React from "react";
import { useNavigate } from "react-router-dom";

function UpdateData(props) {
  const navigate = useNavigate();
  return (
    <div className=" container">
      <form
        className="form form-control"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/show");
        }}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={props.input.name || ""}
          required
          placeholder="Enter Your Name..."
          onChange={props.handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={props.input.email || ""}
          required
          placeholder="Enter Your Email..."
          onChange={props.handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          name="city"
          value={props.input.city || ""}
          required
          placeholder="Enter Your City..."
          onChange={props.handleChange}
        />
        <button className="btn btn-primary" onClick={props.updateApi}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateData;
