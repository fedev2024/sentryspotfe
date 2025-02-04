import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const PreferredLocations = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
        // Transform location names into react-select compatible format
        const options = response.data.data.location_names.map((location) => ({
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

  // Handle location selection (restrict to 3 locations max)
  const handleLocationChange = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      setSelectedLocations(selectedOptions);
    }
  };

  return (
    <div className="form-group col-lg-8 col-md-12 font-light">
      <label className="my mt-4 text-lg">Select Preferred Locations (Max 3)</label>
      <Select
        value={selectedLocations}
        onChange={handleLocationChange}
        options={locationOptions}
        isMulti
        isSearchable
        placeholder="Type to search locations..."
        noOptionsMessage={() => "No locations found"}
      />
      
      {/* Optional: Display selected locations */}
      
    </div>
  );
};

export default PreferredLocations;
