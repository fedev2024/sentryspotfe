import React from "react";

const SectorDropdown = ({ sectors }) => {
  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label>Select Sector*</label>
      <select name="job_sector" className="form-control" required>
        <option value="">Select a sector</option>
        {sectors.map((sector) => (
          <option key={sector.id} value={sector.id}>
            {sector.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectorDropdown; 