// import React from "react";

// const SectorDropdown = ({ sectors }) => {
//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label>Select Sector*</label>
//       <select name="job_sector" className="form-control" required>
//         <option value="">Select a sector</option>
//         {sectors.map((sector) => (
//           <option key={sector.id} value={sector.id}>
//             {sector.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SectorDropdown; 



import React from "react"

import { useState } from "react"
// import { UseFormRegister, FieldErrors } from "react-hook-form"



const SectorDropdown = ({ sectors = [], register, errors }) => {
  const [selectedSector, setSelectedSector] = useState("")

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value)
  }

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Select Sector*</label>

      {register ? (
        // React Hook Form version
        <>
          <select
            {...register("job_sector", { required: "Sector is required" })}
            onChange={handleSectorChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a sector</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
          {errors?.job_sector && <p className="text-red-500 text-sm">{errors.job_sector.message }</p>}
        </>
      ) : (
        // Standalone version
        <select value={selectedSector} onChange={handleSectorChange} className="w-full p-2 border rounded-md">
          <option value="">Select a sector</option>
          {sectors.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default SectorDropdown
