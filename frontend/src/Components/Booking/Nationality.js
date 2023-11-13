import { React, useState, useEffect } from 'react'

export default function Nationality(props) {
  const { formError, handleOnChangeForm } = props;  
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const countryNames = data.map(country => country.name.common);
        setCountries(countryNames);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedCountry(event.target.value);
    handleOnChangeForm(event)
  };

  return (
    <div className="mb-3">
      <label htmlFor="nationality" className="form-label">Nationality</label>
      <select
        className="form-select"
        id="nationality"
        value={selectedCountry}
        onChange={handleSelectChange}
      >
        <option value="" disabled>Select your nationality</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>
      {formError.nationality && <div className="form-text text-danger text-start ">{formError.nationality}</div>}
    </div>
  )
}
