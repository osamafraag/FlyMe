import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../APIs/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ImagesCountry() {
  const [imagesCountry, setImageCountry] = useState([]);
  const [newImageCountry, setNewImageCountry] = useState({
    photo: null,
    country: '',
  });
  const [editingImageCountryId, setEditingImageCountryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get('/countries/api/images/add/')
      .then((res) => setImageCountry(res.data))
      .catch((err) => console.log(err));
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
    formData.append('country_name', newImageCountry.country);
    formData.append('photo', newImageCountry.photo);

    if (editingImageCountryId) {
      handleEdit(editingImageCountryId, formData);
    } else {
      axiosInstance
        .post('/countries/api/images/add/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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

  const handleEdit = (imageId, updatedImage) => {
    axiosInstance
      .put(`/countries/api/images/${imageId}/`, updatedImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (imageId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');

    if (!confirmDelete) {
      return;
    }

    axiosInstance
      .delete(`/countries/api/images/${imageId}/`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
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

  return (
    <div className="text-start">
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