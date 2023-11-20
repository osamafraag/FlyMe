import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../APIs/Config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import NoImage from "./../../Assets/Images/NoImage.jpg"
import { useSelector } from "react-redux";

export default function TrendingPlaces() {
  const token = useSelector(state => state.Token.token);
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const [newTrendingPlace, setNewTrendingPlace] = useState({
    city: "",
    name: "",
    description: ""
  });
  const [editingTrendingPlaceId, setEditingTrendingPlaceId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("countries/api/trendingPlaces/", {
        headers: {Authorization: `Token ${token}`}
      })
      .then((res) => setTrendingPlaces(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTrendingPlace({
      ...newTrendingPlace,
      [name]: value,
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTrendingPlace({
      city: "",
      name: "",
      description: ""
    });
    setEditingTrendingPlaceId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTrendingPlaceId) {
      handleEdit(editingTrendingPlaceId, newTrendingPlace);
    } else {
      const isDuplicateName = trendingPlaces.some(
        (place) => place.name === newTrendingPlace.name
      );

      if (isDuplicateName) {
        alert("Place name must be unique.");
        return;
      }

      axiosInstance
        .post("/countries/api/trendingPlaces/", newTrendingPlace, {
          headers: {Authorization: `Token ${token}`}
        })
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

  const handleEdit = (placeId, updatedPlace) => {
    axiosInstance
      .put(`/countries/api/trendingPlaces/${placeId}`, updatedPlace, {
        headers: {Authorization: `Token ${token}`}
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (placeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this place?");

    if (!confirmDelete) {
      return;
    }

    axiosInstance
      .delete(`/countries/api/trendingPlaces/${placeId}`, {
        headers: {Authorization: `Token ${token}`}
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditClick = (place) => {
    setNewTrendingPlace({
      city: "",
      name: place.name,
      description: place.description
    });
    setEditingTrendingPlaceId(place.id);
    handleShowModal();
  };

  return (
    <div className="container">
      <div className="mb-4 text-end">
        <Button onClick={handleShowModal} style={{backgroundColor: "var(--main-color)", borderColor: "var(--main-color)"}}>
         <FontAwesomeIcon icon={faPlus} /> Add New Trending Places
        </Button>
      </div>
      {trendingPlaces && trendingPlaces.length > 0 ? (
       <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
          {trendingPlaces.map((place) => (
            <div className="col d-flex justify-content-center align-items-center" key={place.id}>
              <Card style={{ width: '18rem' }} className="border border-0 text-start shadow w-100">
                {place.multi_images.length != 0 
                ?
                <Carousel controls={false} indicators={false} data-bs-theme="dark">
                  {place.multi_images.map((image, index) => (
                  <Carousel.Item variant="top" key={index}>
                    <img
                      className="d-block w-100 rounded-top-2"
                      src={image.photo}
                      alt={image.place_name}
                      style={{height: "250px"}}
                    />
                  </Carousel.Item>
                  ))}
                </Carousel>
                :
                <Card.Img variant="top" src={NoImage} style={{height: '250px'}} />
                }
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  <Card.Text>
                    {place.name} - {place.cityName},{" "}
                    {place.countryName} 
                    <p>id &rarr; {place.id}</p>
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn border-0 bg-white p-0" onClick={() => handleEditClick(place)}><FontAwesomeIcon icon={faPencilAlt} style={{color: "var(--main-color)"}} /></Button>
                    <Button className="btn border-0 bg-white p-0" onClick={() => handleDelete(place.id)}><FontAwesomeIcon icon={faTrash} className="text-danger" /></Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTrendingPlaceId ? "Edit Place" : "Add New Place"}
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
                value={newTrendingPlace.name}
                onChange={handleInputChange} 
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">City ID</span>
              <input 
                type="text" 
                class="form-control" 
                name="city"
                value={newTrendingPlace.city}
                onChange={handleInputChange} 
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Description</span>
              <textarea 
                rows="3" 
                class="form-control" 
                name="description"
                value={newTrendingPlace.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button className="btn my-3 text-white" type="submit" style={{backgroundColor: "var(--main-color)"}}>
              {editingTrendingPlaceId ? "Update Place" : "Add Place"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}