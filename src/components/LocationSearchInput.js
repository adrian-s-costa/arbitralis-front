import React, { useState } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useNavigate } from 'react-router-dom';

const LocationSearchInput = ({ setOpen }) => {
  const [address, setAddress] = useState('');

  const handleChange = (address) => {
    setAddress(address);
  };

  const savedToken = localStorage.getItem('token');
  
  const navigate = useNavigate();

  const handleSelect = async (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        axios.get("http://localhost:3003/auth/profile", { headers: { Authorization: `Bearer ${ savedToken }` } })
        .then((res)=>{
          axios.post('http://localhost:3003/weather', { latLng, address, res }, { headers: { Authorization: `Bearer ${ savedToken }` } })
        })
        .catch(()=>{
          //navigate("/sign-in");
        })
      })
      .catch((error) => console.error('Error', error))
      .finally(() => setOpen(false));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Pesquise lugares ...',
              className:
                'location-search-input pl-2 block w-[450px] sm:w-90% rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  className="flex"
                >
                  <div className="pt-[1px] mr-[2px]">
                    <ion-icon name="location-sharp"></ion-icon>
                  </div>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
