import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../APIs/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";

export default function ImagesCity() {
  const token = useSelector(state => state.Token.token);
  const [imagesCity, setImageCity] = useState([]);
  const [newImageCity, setNewImageCity] = useState({
    photo: null,
    city: "",
  });
  const [editingImageCityId, setEditingImageCityId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("/countries/api/cities/images/add/", {
        headers: { Authorization: `Token ${token}` }
      })
      .then((res) => {
        setErrorMessage(false)
        setImageCity(res.data)
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage("Something gone wrong!")
      });
  };

  const handleInputChange = async (e) => {
    const { name, type } = e.target;
    let value;

    if (type === "file") {
      const file = e.target.files[0];
      value = file;
    } else {
      value = e.target.value;
    }

    setNewImageCity({
      ...newImageCity,
      [name]: value,
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewImageCity({
      photo: null,
      city: "",
    });
    setEditingImageCityId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("city", newImageCity.city);
    formData.append("photo", newImageCity.photo);

    if (editingImageCityId) {
      handleEdit(editingImageCityId, formData);
    } else {
      axiosInstance
        .post("/countries/api/cities/images/add/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`
          },
        })
        .then((response) => {
          console.log(response.data);
          fetchData();
          setErrorMessage(false)
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Something gone wrong, May Be There is No City With This id!")
        });
    }

    handleCloseModal();
  };

  const handleEdit = (imageId, updatedImage) => {
    axiosInstance
      .put(`/countries/api/cities/images/${imageId}/`, updatedImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`
        },
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
        setErrorMessage(false)
      })
      .catch((error) => {
        setErrorMessage("Something gone wrong!")
      });
  };

  const handleDelete = (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) {
      return;
    }

    axiosInstance
      .delete(`/countries/api/cities/images/${imageId}/`, {
        headers: { Authorization: `Token ${token}` }
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
        setErrorMessage(false)
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Something gone wrong!")
      });
  };

  const handleEditClick = (image) => {
    setNewImageCity({
      photo: null,
      city: image.city,
    });
    setEditingImageCityId(image.id);
    handleShowModal();
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (
    <div className="text-start">
      {errorMessage && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"600px" }}>
          {errorMessage}
        </div>
      )}
      <div className="mb-4 text-end">
        <Button onClick={handleShowModal} style={{ backgroundColor: "var(--main-color)", borderColor: "var(--main-color)" }}>
          <FontAwesomeIcon icon={faPlus} /> Add New City Image
        </Button>
      </div>
      {imagesCity && imagesCity.length > 0 ? (
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
          {imagesCity.map((image) => (
            <div className="col d-flex justify-content-center align-items-center" key={image.id}>
              <Card style={{ width: '18rem' }} className="border border-0 text-start shadow w-100">
                <Card.Img variant="top" src={image.photo} alt={`City: ${image.cityName}`} style={{ height: "250px" }} />
                <Card.Body>
                  <Card.Title>{image.cityName}</Card.Title>
                  <Card.Text>
                    {image.cityName} has ID &rarr; {image.city}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn border-0 bg-white p-0" onClick={() => handleEditClick(image)}><FontAwesomeIcon icon={faPencilAlt} style={{ color: "var(--main-color)" }} /></Button>
                    <Button className="btn border-0 bg-white p-0" onClick={() => handleDelete(image.id)}><FontAwesomeIcon icon={faTrash} className="text-danger" /></Button>
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
            {editingImageCityId ? "Edit Image" : "Add New City Image"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="cityId">City ID</InputGroup.Text>
              <Form.Control
                type="number"
                name="city"
                value={newImageCity.city}
                onChange={handleInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="formPhoto">Photo</InputGroup.Text>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleInputChange}
              />
            </InputGroup>
            <Button style={{ backgroundColor: "var(--main-color)", borderColor: "var(--main-color)" }} className="text-white" type="submit">
              {editingImageCityId ? "Update Image" : "Add Image"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}