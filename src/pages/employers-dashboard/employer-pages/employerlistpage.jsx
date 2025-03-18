import { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import axios from "axios";

const EmployersListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    axios
      .get("https://api.sentryspot.co.uk/api/admin/employee-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminToken, // Ensure proper token format
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          // Add a local status state for each employee
          const updatedEmployees = response.data.data.employeer_detail.map(
            (emp) => ({
              ...emp,
              is_active: emp.is_active || 0, // Default to 0 if missing
            })
          );
          setEmployees(updatedEmployees);
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  // Toggle status locally (without API call)
  const toggleStatus = (empId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === empId
          ? { ...emp, is_active: emp.is_active === 1 ? 0 : 1 }
          : emp
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Employers List</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="py-3 px-4 border">First Name</th>
                <th className="py-3 px-4 border">Last Name</th>
                <th className="py-3 px-4 border">Contact</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{emp.first_name}</td>
                  <td className="py-2 px-4">{emp.last_name}</td>
                  <td className="py-2 px-4">{emp.phone}</td>
                  <td className="py-2 px-4">{emp.email}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => toggleStatus(emp.id)}
                      className="text-xl focus:outline-none"
                    >
                      {emp.is_active === 1 ? (
                        <FaToggleOn className="text-green-500" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployersListPage;
