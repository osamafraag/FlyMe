// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Airports() {
//   const [airports, setAirports] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [newAirport, setNewAirport] = useState({
//     city: "",
//     name: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios
//       .get("https://osamafraag.pythonanywhere.com/countries/api/airports/")
//       .then((res) => setAirports(res.data))
//       .catch((err) => console.error("Error fetching data:", err));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setNewAirport({
//       ...newAirport,
//       [name]: value,
//     });

//     if (name === "name") {
//       fetchCities(value);
//     }
//   };

//   const fetchCities = (airportName) => {
//     axios
//       .get(`https://osamafraag.pythonanywhere.com/countries/api/cities/?search=${airportName}`)
//       .then((res) => setCities(res.data))
//       .catch((err) => console.error("Error fetching cities:", err));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post(
//         "https://osamafraag.pythonanywhere.com/countries/api/airports/",
//         newAirport
//       )
//       .then(() => {
//         fetchData();
//         setNewAirport({
//           city: "",
//           name: "",
//         });
//       })
//       .catch((err) => console.error("Error posting data:", err));
//   };

//   return (
//     <div>
//       <div className="row my-4">
//         <div className="text-start col-7">
//           <h2 className="text-danger">Available Airports</h2>
//           {airports && airports.length > 0 ? (
//             <ul>
//               {airports.map((airport) => (
//                 <li key={airport.id}>
//                   &rarr; <strong>{airport.name}</strong> - {airport.cityName},{" "}
//                   {airport.countryName}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>
//         <div className="text-start col-5">
//           <h2 className="text-danger ">Add New Airport</h2>
//           <form onSubmit={handleSubmit}>
//             <label className="my-2">
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={newAirport.name}
//                 onChange={handleInputChange}
//               />
//             </label><br/>
//             <label className="my-2">
//               City:
//               <input
//                 type="text"
//                 name="city"
//                 value={newAirport.city}
//                 onChange={handleInputChange}
//               />
//             </label>
//           </form>
//           <button  className="btn btn-primary my-3" type='submit'>Add Airport</button>
//           {cities && cities.length > 0 && (
//             <div>
//               <p>Possible Cities:</p>
//               <ul>
//                 {cities.map((city) => (
//                   <li key={city.id}>{city.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Airports() {
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState([]);
  const [newAirport, setNewAirport] = useState({
    city: "",
    name: "",
  });
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://osamafraag.pythonanywhere.com/countries/api/airports/")
      .then((res) => setAirports(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewAirport({
      ...newAirport,
      [name]: value,
    });

    // Fetch cities based on the entered airport name
    if (name === "name") {
      fetchCities(value);
    }
  };

  const fetchCities = (airportName) => {
    axios
      .get(`https://osamafraag.pythonanywhere.com/countries/api/cities/?search=${airportName}`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Error fetching cities:", err));
  };

  const handleCityClick = (selectedCity) => {
    setSelectedCity(selectedCity);

    // You can choose to fetch more details about the selected city if needed
    // Example: fetchCityDetails(selectedCity.id);
  };

  const fetchCityDetails = (cityId) => {
    axios
      .get(`https://osamafraag.pythonanywhere.com/countries/api/cities/${cityId}/`)
      .then((res) => {
        // Handle the detailed city information, you can set it to state or display it as needed
        console.log('City Details:', res.data);
      })
      .catch((err) => console.error("Error fetching city details:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://osamafraag.pythonanywhere.com/countries/api/airports/", newAirport)
      .then(() => {
        fetchData();
        setNewAirport({
          city: "",
          name: "",
        });
      })
      .catch((err) => console.error("Error posting data:", err));
  };

  return (
    <div>
      <div className="row my-4">
        <div className="text-start col-7">
          <h2 className="text-danger">Available Airports</h2>
          {airports && airports.length > 0 ? (
            <ul>
              {airports.map((airport) => (
                <li key={airport.id}>
                  &rarr; <strong>{airport.name}</strong> - {airport.cityName},{" "}
                  {airport.countryName}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className=" text-start col-5">
          <h2 className="text-danger  ">Add New Airport</h2>
          <form onSubmit={handleSubmit}>
            <label className="my-2">
              Name:
              <input
                type="text"
                name="name"
                value={newAirport.name}
                onChange={handleInputChange}
              />
            </label><br/>
            <label className="my-2">
              City:
              <input
                type="text"
                name="city"
                value={newAirport.city}
                onChange={handleInputChange}
              />
            </label><br/>
            <button className="btn btn-primary my-3" type="submit">
              Add Airport
            </button>
          </form>
          {cities && cities.length > 0 && (
            <div>
              <p>Possible Cities:</p>
              <ul>
                {cities.map((city) => (
                  <li key={city.id} onClick={() => handleCityClick(city)}>
                    {city.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedCity && (
            <div>
              <h3>Selected City Details:</h3>
              <p>ID: {selectedCity.id}</p>
              <p>Name: {selectedCity.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
