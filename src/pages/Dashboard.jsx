import loansData from "../data/loans";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");

  const filteredLoans = loansData.filter((loan) =>
    loan.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome, <span className="text-indigo-600">{user.name}</span>
        </h2>

        <button
          onClick={handleLogout}
          className="w-fit rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Loan Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                City
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan, index) => (
                <tr
                  key={loan.id}
                  className={`border-b last:border-none ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {loan.customerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {loan.loanType}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        loan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {loan.city}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
