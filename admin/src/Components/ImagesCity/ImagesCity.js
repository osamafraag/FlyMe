import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../APIs/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ImagesCity() {
  const [imagesCity, setImageCity] = useState([]);
  const [newImageCity, setNewImageCity] = useState({
    photo: null,
    city: "",
  });
  const [editingImageCityId, setEditingImageCityId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("/countries/api/cities/images/add/")
      .then((res) => setImageCity(res.data))
      .catch((err) => console.log(err));
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

    setNewImageCity({
      photo: null,
      city: "",
    });
    setEditingImageCityId(null);
  };

  const handleEdit = (imageId, updatedImage) => {
    axiosInstance
      .put(`/countries/api/cities/images/${imageId}/`, updatedImage, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) {
      return;
    }

    axiosInstance
      .delete(`/countries/api/cities/images/${imageId}/`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditClick = (image) => {
    setNewImageCity({
      photo: null,
      city: image.city,
    });
    setEditingImageCityId(image.id);
  };

  return (
    <div className="text-start">
      <h2 className="text-danger">City Images</h2>
      {imagesCity && imagesCity.length > 0 ? (
        <ul>
          {imagesCity.map((image) => (
            <li key={image.id}>
              <img src={image.photo} alt={`City: ${image.cityName}`} />
              <span>Name of City :<strong>{image.cityName}</strong></span>,
              <span>ID of City :<strong>{image.city}</strong></span>
              <button
                className="btn ms-2"
                onClick={() => handleEditClick(image)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className="btn ms-2"
                style={{ color: "brown" }}
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

      <h2 className="text-danger">
        {editingImageCityId ? "Edit Image" : "Add New City Image"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="my-2">
          City ID:
          <input
            type="number"
            name="city"
            value={newImageCity.city}
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
          {editingImageCityId ? "Update Image" : "Add Image"}
        </button>
      </form>
    </div>
  );
}
