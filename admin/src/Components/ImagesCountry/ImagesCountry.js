import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../APIs/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

export default function ImagesCountry() {
  const token = useSelector(state => state.Token.token);
  const [imagesCountry, setImageCountry] = useState([]);
  const [newImageCountry, setNewImageCountry] = useState({
    photo: null,
    country: '',
  });
  const [editingImageCountryId, setEditingImageCountryId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get('/countries/api/images/add/', {
        headers: {Authorization: `Token ${token}`}
      })
      .then((res) => {
        setImageCountry(res.data)
        setErrorMessage(false)
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage("Something gone wrong!")
      });
  };

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    let value;

    if (type === 'file') {
      const file = e.target.files[0];
      value = file;
    } else {
      value = e.target.value;
    }

    setNewImageCountry({
      ...newImageCountry,
      [name]: value,
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewImageCountry({
      photo: null,
      country: '',
    });
    setEditingImageCountryId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('country', newImageCountry.country);
    formData.append('photo', newImageCountry.photo);

    if (editingImageCountryId) {
      handleEdit(editingImageCountryId, formData);
    } else {
      console.log(formData)
      axiosInstance
        .post('/countries/api/images/add/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
          setErrorMessage("Something gone wrong!, May be There is No Country With This id")
        });
    }

    handleCloseModal();
  };

  const handleEdit = (imageId, updatedImage) => {
    axiosInstance
      .put(`/countries/api/images/${imageId}/`, updatedImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
        setErrorMessage("Something gone wrong!")
      });
  };

  const handleDelete = (imageId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');

    if (!confirmDelete) {
      return;
    }

    axiosInstance
      .delete(`/countries/api/images/${imageId}/`, {
        headers: {Authorization: `Token ${token}`}
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
    setNewImageCountry({
      photo: null,
      country: image.country,
    });
    setEditingImageCountryId(image.id);
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
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
      <div className="mb-4 text-end">
        <Button onClick={handleShowModal} style={{backgroundColor: "var(--main-color)", borderColor: "var(--main-color)"}}>
         <FontAwesomeIcon icon={faPlus} /> Add New Country Image
        </Button>
      </div>
      {imagesCountry && imagesCountry.length > 0 ? (
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
          {imagesCountry.map((image) => (
            <div className="col d-flex justify-content-center align-items-center" key={image.id}>
              <Card style={{ width: '18rem' }} className="border border-0 text-start shadow w-100">
                <Card.Img variant="top" src={image.photo} alt={`Country: ${image.country_name}`} style={{ height: "250px" }} />
                <Card.Body>
                  <Card.Title>{image.country_name}</Card.Title>
                  <Card.Text>
                    {image.country_name} has ID &rarr; {image.country}
                  </Card.Text>
                  {/* countries/api/images/add/ */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn border-0 bg-white p-0" onClick={() => handleEditClick(image)}><FontAwesomeIcon icon={faPencilAlt} style={{color: "var(--main-color)"}} /></Button>
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
            {editingImageCountryId ? 'Edit Image' : 'Add New Country Image'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">CountryID</span>
              <input 
                class="form-control" 
                type="number"
                name="country"
                value={newImageCountry.country}
                onChange={handleInputChange} 
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Photo</span>
              <input 
                class="form-control" 
                type="file"
                name="photo"
                onChange={handleInputChange}
              />
            </div>
            
            <button className="btn my-3 text-white" type="submit" style={{backgroundColor: "var(--main-color)"}}>
              {editingImageCountryId ? 'Update Image' : 'Add Image'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}