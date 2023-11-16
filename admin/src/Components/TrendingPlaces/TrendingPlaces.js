import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../APIs/Config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';


export default function TrendingPlaces() {
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const [newTrendingPlace, setNewTrendingPlace] = useState({
    city: "",
    name: "",
    description: ""
  });
  const [editingTrendingPlaceId, setEditingTrendingPlaceId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("countries/api/trendingPlaces/")
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
        .post("/countries/api/trendingPlaces/", newTrendingPlace)
        .then((response) => {
          console.log(response.data);
          fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setNewTrendingPlace({
      city: "",
      name: "",
      description: ""
    });
    setEditingTrendingPlaceId(null);
  };

  const handleEdit = (placeId, updatedPlace) => {
    axiosInstance
      .put(`/countries/api/trendingPlaces/${placeId}`, updatedPlace)
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
      .delete(`/countries/api/trendingPlaces/${placeId}`)
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
  };

  return (
    <div className="text-start">
      <h2 className="text-danger">Trending Places</h2>
      {trendingPlaces && trendingPlaces.length > 0 ? (
        <ul>
          {trendingPlaces.map((place) => (
            <li key={place.id}>
              &rarr; <strong>{place.name}</strong> - {place.cityName},{" "}
              {place.countryName}
              <button
                className="btn ms-2"
                onClick={() => handleEditClick(place)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className="btn  ms-2"
                style={{ color: 'brown' }}

                onClick={() => handleDelete(place.id)}
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
        {editingTrendingPlaceId ? "Edit Place" : "Add New Place"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="my-2">
          Name:
          <input
            type="text"
            name="name"
            value={newTrendingPlace.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="my-2">
          CityID:
          <input
            type="text"
            name="city"
            value={newTrendingPlace.city}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="my-2">
          Description:
          <textarea
            name="description"
            value={newTrendingPlace.description}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <br />
        <button className="btn btn-primary my-3" type="submit">
          {editingTrendingPlaceId ? "Update Place" : "Add Place"}
        </button>
      </form>
    </div>
  );
}
