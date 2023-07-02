import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import "./AddParking.css";

const AddParking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    providerID: location.state.providerId,
    city: "",
    address: "",
    pricePerHour: "",
    space: "",
    startTime: "",
    endTime: "",
    slots: []
  });

  const { city, address, pricePerHour, space, startTime, endTime, slots } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3001/addParking", user);
    navigate('/provideparking', { state: { providerId: location.state.providerId } })
    alert('Data Inserted');
  };
  return (
    <div id = "parkForm">
    <div className="row">
      <div className="col-sm-4 mx-auto shadow p-5" style = {{backgroundColor : "LightGray",marginTop : '5%'}}>
        <h2 className="text-center mb-4">Add A Parking</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter City"
              name="city"
              value={city}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Address"
              name="address"
              value={address}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Price Per Hour"
              name="pricePerHour"
              value={pricePerHour}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Space"
              name="space"
              value={space}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Start Time"
              name="startTime"
              value={startTime}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter End Time"
              name="endTime"
              value={endTime}
              onChange={e => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary btn-block" style = {{marginTop : '3%'}}>Add Parking</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddParking;