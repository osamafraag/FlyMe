import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../APIs/Config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

export default function Airports() {
  const [airports, setAirports] = useState([]);
  const [newAirport, setNewAirport] = useState({
    city: "",
    name: "",
  });
  const [editingAirportId, setEditingAirportId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAirport({
      city: "",
      name: "",
    });
    setEditingAirportId(null);
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

    handleCloseModal();
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
    handleShowModal();
  };

  return (
    <>
    <div className="mb-4 text-end">
      <Button style={{backgroundColor: "var(--main-color)", borderColor: "var(--main-color)"}} onClick={handleShowModal}>
        <FontAwesomeIcon icon={faPlus} /> Add New Airport
      </Button>
    </div>
    {airports && airports.length > 0 
    ?
    <table className="table table-hover shadow-sm">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>City Name</th>
          <th>Country Name</th> 
          <th>Edit</th>  
          <th>Delete</th>  
        </tr>
      </thead>
      <tbody> 
        {airports.map((airport, index) => (
          <tr>
            <td>{index}</td>
            <td>{airport.name}</td>
            <td>{airport.cityName}</td>
            <td>{airport.countryName}</td>
            <td>
              <button
                className="btn ms-2"
                onClick={() => handleEditClick(airport)}
                style={{color: "var(--main-color)"}}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </td>
            <td>
              <button
                className="btn ms-2 text-danger"
                onClick={() => handleDelete(airport.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    :
      (
        <p>Loading...</p>
      )
    }
     
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingAirportId ? "Edit Airport" : "Add New Airport"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Name</span>
            <input 
              type="text"
              class="form-control" 
              name="name"
              value={newAirport.name}
              onChange={handleInputChange}
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">City ID</span>
            <input 
              type="text"
              class="form-control" 
              name="city"
              value={newAirport.city}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn my-3 text-white" type="submit" style={{backgroundColor: "var(--main-color)"}}>
            {editingAirportId ? "Update Airport" : "Add Airport"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
    </>
  );
}