import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../APIs/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ImagesCountry() {
  const [imagesCountry, setImageCountry] = useState([]);
  const [newImageCountry, setNewImageCountry] = useState({
    photo: null,
    country: '',
  });
  const [editingImageCountryId, setEditingImageCountryId] = useState(null);

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

    setNewImageCountry({
      photo: null,
      country: '',
    });
    setEditingImageCountryId(null);
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
      country: image.country_name,
    });
    setEditingImageCountryId(image.id);
  };

  return (
    <div className="text-start">
      <h2 className="text-danger">Country Images</h2>
      {imagesCountry && imagesCountry.length > 0 ? (
        <ul>
          {imagesCountry.map((image) => (
            <li key={image.id}>
              <img src={image.photo} alt={`Country: ${image.country_name}`} />
              <strong>{image.country_name}</strong>
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

      <h2 className="text-danger">{editingImageCountryId ? 'Edit Image' : 'Add New Country Image'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="my-2">
          CountryID:
          <input
            type="number"
            name="country"
            value={newImageCountry.country}
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
          {editingImageCountryId ? 'Update Image' : 'Add Image'}
        </button>
      </form>
    </div>
  );
}
