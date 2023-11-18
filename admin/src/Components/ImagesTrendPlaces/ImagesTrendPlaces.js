import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../APIs/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ImagesTrendPlaces() {
  const [imagesTrendPlace, setImagesTrendPlace] = useState([]);
  const [newImagesTrendPlace, setNewImagesTrendPlace] = useState({
    photo: null,
    place_name: '',
  });
  const [editingImageTrendingPlaceId, setEditingImageTrendingPlaceId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get('countries/api/trendingPlaces/images/add/')
      .then((res) => setImagesTrendPlace(res.data))
      .catch((err) => console.log('Error Fetching data ', err));
  };

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    let value;

    if (type === 'file') {
      const file = e.target.files[0];
      value = file;

      const reader = new FileReader();
      reader.onloadend = () => {
      };
      reader.readAsDataURL(file);
    } else {
      value = e.target.value;
    }

    setNewImagesTrendPlace({
      ...newImagesTrendPlace,
      [name]: value,
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewImagesTrendPlace({
      photo: null,
      trendingPlace: '',
    });
    setEditingImageTrendingPlaceId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('trendingPlace', newImagesTrendPlace.trendingPlace);
    formData.append('photo', newImagesTrendPlace.photo);

    if (editingImageTrendingPlaceId) {
      handleEdit(editingImageTrendingPlaceId, formData);
    } else {
      axiosInstance
        .post('/countries/api/trendingPlaces/images/add/', formData, {
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
      .put(`countries/api/trendingPlaces/images/${imageId}`, updatedImage, {
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
      .delete(`countries/api/trendingPlaces/images/${imageId}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditClick = (image) => {
    setNewImagesTrendPlace({
      photo: null,
      trendingPlace: image.trendingPlace,
    });
    setEditingImageTrendingPlaceId(image.id);
    handleShowModal();
  };

  return (
    <div>
      <div className="mb-4 text-end">
        <Button  onClick={handleShowModal} style={{backgroundColor: "var(--main-color)", borderColor: "var(--main-color)"}}>
         <FontAwesomeIcon icon={faPlus} /> Add New Trending Places Image
        </Button>
      </div>
      {imagesTrendPlace && imagesTrendPlace.length > 0 ? (
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
        {imagesTrendPlace.map((image) => (
          <div className="col d-flex justify-content-center align-items-center" key={image.id}>
            <Card style={{ width: '18rem' }} className="border border-0 text-start shadow w-100">
              <Card.Img variant="top" src={image.photo} alt={`Trending Place: ${image.trendingPlace}`} style={{ height: "250px" }} />
              <Card.Body>
                <Card.Title>{image.place_name}</Card.Title>
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
            {editingImageTrendingPlaceId ? 'Edit Image' : 'Add New Image'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Trending PlaceID</span>
              <input 
                class="form-control" 
                type="number"
                name="trendingPlace"
                value={newImagesTrendPlace.trendingPlace}
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
            <button  className="btn my-3 text-white" type="submit" style={{backgroundColor: "var(--main-color)"}}>
              {editingImageTrendingPlaceId ? 'Update Image' : 'Add Image'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}