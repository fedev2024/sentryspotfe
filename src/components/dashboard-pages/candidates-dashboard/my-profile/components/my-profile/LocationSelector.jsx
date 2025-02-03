// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const LocationSelector = () => {
// //   // State for countries and locations
// //   const [countries, setCountries] = useState([]);
// //   const [locations, setLocations] = useState([]);
  
// //   // State for form selections
// //   const [selectedCountry, setSelectedCountry] = useState('');
// //   const [selectedLocation, setSelectedLocation] = useState('');

// //   // Fetch countries and locations on component mount
// //   useEffect(() => {
// //     const fetchLocations = async () => {
// //       try {
// //         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
// //         // Process locations data
// //         console.log(response,"LLL");
// //         const processedLocations = response.data.data.location_names.map(location => ({
// //           id: location.id,
// //           name: location.name,
// //           countryId: location.country_id
// //         }));
        
// //         // Group locations by country
// //         const groupedLocations = processedLocations.reduce((acc, location) => {
// //           if (!acc[location.countryId]) {
// //             acc[location.countryId] = [];
// //           }
// //           acc[location.countryId].push(location);
// //           return acc;
// //         }, {});

// //         // Extract unique countries
// //         const uniqueCountries = [...new Set(processedLocations.map(loc => loc.countryId))]
// //           .map(countryId => ({
// //             id: countryId,
// //             name: processedLocations.find(loc => loc.countryId === countryId)?.countryName || 'Unknown'
// //           }));

// //         setCountries(uniqueCountries);
// //         setLocations(groupedLocations);
// //       } catch (error) {
// //         console.error('Error fetching locations:', error);
// //       }
// //     };

// //     fetchLocations();
// //   }, []);

// //   // Handle country change
// //   const handleCountryChange = (e) => {
// //     const countryId = e.target.value;
// //     setSelectedCountry(countryId);
// //     // Reset location when country changes
// //     setSelectedLocation('');
// //   };

// //   // Handle location change
// //   const handleLocationChange = (e) => {
// //     setSelectedLocation(e.target.value);
// //   };

// //   return (
// //     <div className="location-selector">
// //       <div className="form-group col-lg-4 col-md-12 font-light">
// //         <label className="my-2 mt-4 text-lg">(Current - Country)</label>
// //         <select
// //           name="country"
// //           value={selectedCountry}
// //           onChange={handleCountryChange}
// //           required
// //           className="form-control"
// //         >
// //           <option value="">Select Country</option>
// //           {countries.map((country) => (
// //             <option key={country.id} value={country.id}>
// //               {country.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {selectedCountry && (
// //         <div className="form-group col-lg-4 col-md-12 font-light">
// //           <label className="my-2 mt-4 text-lg">(Current - Location)</label>
// //           <select
// //             name="location"
// //             value={selectedLocation}
// //             onChange={handleLocationChange}
// //             required
// //             className="form-control"
// //             disabled={!selectedCountry}
// //           >
// //             <option value="">Select Location</option>
// //             {locations[selectedCountry]?.map((location) => (
// //               <option key={location.id} value={location.id}>
// //                 {location.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default LocationSelector;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const LocationSelector = () => {
//   // State for countries, cities, and areas
//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState({});
//   const [areas, setAreas] = useState({});
  
//   // State for form selections
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedArea, setSelectedArea] = useState('');

//   // Fetch locations on component mount
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
//         // Process location names
//         const locationNames = response.data.data.location_names;
        
//         // Organize locations hierarchically
//         const countriesSet = new Set();
//         const citiesMap = {};
//         const areasMap = {};

//         locationNames.forEach(location => {
//           const [countryCode, city, area] = location.split(',');
          
//           // Add country
//           countriesSet.add(countryCode);
          
//           // Organize cities by country
//           if (!citiesMap[countryCode]) {
//             citiesMap[countryCode] = new Set();
//           }
//           citiesMap[countryCode].add(city);
          
//           // Organize areas by city
//           if (!areasMap[city]) {
//             areasMap[city] = new Set();
//           }
//           if (area) {
//             areasMap[city].add(area);
//           }
//         });

//         // Convert sets to sorted arrays
//         const countriesList = Array.from(countriesSet).map(code => ({
//           id: code,
//           name: code === 'GB' ? 'United Kingdom' : code
//         }));

//         const citiesByCountry = {};
//         Object.entries(citiesMap).forEach(([countryCode, citySet]) => {
//           citiesByCountry[countryCode] = Array.from(citySet).sort();
//         });

//         const areasByCity = {};
//         Object.entries(areasMap).forEach(([city, areaSet]) => {
//           areasByCity[city] = Array.from(areaSet).sort();
//         });

//         setCountries(countriesList);
//         setCities(citiesByCountry);
//         setAreas(areasByCity);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   // Handle country change
//   const handleCountryChange = (e) => {
//     const countryCode = e.target.value;
//     setSelectedCountry(countryCode);
//     // Reset dependent selections
//     setSelectedCity('');
//     setSelectedArea('');
//   };

//   // Handle city change
//   const handleCityChange = (e) => {
//     const cityName = e.target.value;
//     setSelectedCity(cityName);
//     // Reset area selection
//     setSelectedArea('');
//   };

//   // Handle area change
//   const handleAreaChange = (e) => {
//     setSelectedArea(e.target.value);
//   };

//   return (
//     <div className="location-selector">
//       {/* Country Dropdown */}
//       <div className="form-group col-lg-4 col-md-12 font-light">
//         <label className="my-2 mt-4 text-lg">Country</label>
//         <select
//           name="country"
//           value={selectedCountry}
//           onChange={handleCountryChange}
//           required
//           className="form-control"
//         >
//           <option value="">Select Country</option>
//           {countries.map((country) => (
//             <option key={country.id} value={country.id}>
//               {country.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* City Dropdown (conditionally rendered) */}
//       {selectedCountry && (
//         <div className="form-group col-lg-4 col-md-12 font-light">
//           <label className="my-2 mt-4 text-lg">City</label>
//           <select
//             name="city"
//             value={selectedCity}
//             onChange={handleCityChange}
//             required
//             className="form-control"
//             disabled={!selectedCountry}
//           >
//             <option value="">Select City</option>
//             {cities[selectedCountry]?.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Area Dropdown (conditionally rendered) */}
//       {selectedCity && (
//         <div className="form-group col-lg-4 col-md-12 font-light">
//           <label className="my-2 mt-4 text-lg">Area</label>
//           <select
//             name="area"
//             value={selectedArea}
//             onChange={handleAreaChange}
//             required
//             className="form-control"
//             disabled={!selectedCity}
//           >
//             <option value="">Select Area</option>
//             {areas[selectedCity]?.map((area) => (
//               <option key={area} value={area}>
//                 {area}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const LocationAutocomplete = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
        // Transform location names into react-select compatible format
        const options = response.data.data.location_names.map((location, index) => ({
          value: location,
          label: location.split(',').slice(1).join(', ') // Display City, Area
        }));

        setLocationOptions(options);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Handle location selection
  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  return (
    <div className="form-group col-lg-4 col-md-12 font-light">
      <label className="my mt-4 text-lg">Select Location</label>
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        options={locationOptions}
        isSearchable={true}
        placeholder="Type to search locations..."
        noOptionsMessage={() => "No locations found"}
        // styles={{
        //   // Optional: Custom styling
        //   control: (base) => ({
        //     ...base,
        //     borderColor: '#ced4da',
        //     '&:hover': {
        //       borderColor: '#80bdff'
        //     }
        //   })
        // }}
      />
      
      {/* Optional: Display selected location details */}
      {/* {selectedLocation && (
        <div className="mt-3">
          <strong>Selected Location:</strong> {selectedLocation.value}
        </div>
      )} */}
    </div>
  );
};

export default LocationAutocomplete;