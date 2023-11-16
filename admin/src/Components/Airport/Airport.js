import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../APIs/Config";

export default function Airports() {
  const [airports, setAirports] = useState([]);
  const [newAirport, setNewAirport] = useState({
    city: "",
    name: "",
  });
  const [editingAirportId, setEditingAirportId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("countries/api/airports/")
      .then((res) => setAirports(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewAirport({
      ...newAirport,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAirportId) {
      handleEdit(editingAirportId, newAirport);
    } else {
      const isDuplicateName = airports.some(
        (airport) => airport.name === newAirport.name
      );

      if (isDuplicateName) {
        alert("Airport name must be unique.");
        return;
      }

      axiosInstance
        .post("/countries/api/airports/", newAirport)
        .then((response) => {
          console.log(response.data);
          fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setNewAirport({
      city: "",
      name: "",
    });
    setEditingAirportId(null);
  };

  const handleEdit = (airportId, updatedAirport) => {
    axiosInstance
      .put(`/countries/api/airports/${airportId}/`, updatedAirport)  
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (airportId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this airport?");
  
    if (!confirmDelete) {
      return;
    }
  
    axiosInstance
    .delete(`/countries/api/airports/${airportId}/`)  
    .then((response) => {
      console.log(response.data);
      fetchData(); 
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleEditClick = (airport) => {
    setNewAirport({
      city: "",
      name: airport.name,
    });
    setEditingAirportId(airport.id);
  };

  return (
    <div className="text-start">
      <h2 className="text-danger">Available Airports</h2>
      {airports && airports.length > 0 ? (
        <ul>
          {airports.map((airport) => (
            <li key={airport.id}>
              &rarr; <strong>{airport.name}</strong> - {airport.cityName},{" "}
              {airport.countryName}
              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={() => handleEditClick(airport)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => handleDelete(airport.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <h2 className="text-danger">
        {editingAirportId ? "Edit Airport" : "Add New Airport"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="my-2">
          Name:
          <input
            type="text"
            name="name"
            value={newAirport.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="my-2">
          CityID:
          <input
            type="text"
            name="city"
            value={newAirport.city}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className="btn btn-primary my-3" type="submit">
          {editingAirportId ? "Update Airport" : "Add Airport"}
        </button>
      </form>
    </div>
  );
}
