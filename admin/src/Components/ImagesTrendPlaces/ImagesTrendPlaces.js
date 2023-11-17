import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../APIs/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ImagesTrendPlaces() {
  const [imagesTrendPlace, setImagesTrendPlace] = useState([]);
  const [newImagesTrendPlace, setNewImagesTrendPlace] = useState({
    photo: null,
    trendingPlace: '',
  });
  const [editingImageTrendingPlaceId, setEditingImageTrendingPlaceId] = useState(null);

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

    setNewImagesTrendPlace({
      photo: null,
      trendingPlace: '',
    });
    setEditingImageTrendingPlaceId(null);
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
  };

  return (
    <div className="text-start">
      <h2 className="text-danger">Trending Places Images</h2>
      {imagesTrendPlace && imagesTrendPlace.length > 0 ? (
        <ul>
          {imagesTrendPlace.map((image) => (
            <li key={image.id}>
              <img src={image.photo} alt={`Trending Place: ${image.trendingPlace}`} />
              <strong>{image.trendingPlace}</strong>
              <button className="btn ms-2" onClick={() => handleEditClick(image)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className="btn ms-2"
                style={{ color: 'brown' }}
                onClick={() => handleDelete(image.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <h2 className="text-danger">{editingImageTrendingPlaceId ? 'Edit Image' : 'Add New Image'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="my-2">
          Trending PlaceID:
          <input
            type="number"
            name="trendingPlace"
            value={newImagesTrendPlace.trendingPlace}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="my-2">
          Photo:
          <input
            type="file"
            name="photo"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className="btn btn-primary my-3" type="submit">
          {editingImageTrendingPlaceId ? 'Update Image' : 'Add Image'}
        </button>
      </form>
    </div>
  );
}
