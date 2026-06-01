import { Eye, SearchIcon, Users2 } from "lucide-react"
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  date: string;
  ordersCount: number;
  totalSpent: number;
  status: "Active" | "Inactive" | "Suspended";
};
const mockUsers: User[] = [
  {
    id: "USR-1001",
    name: "Junaid Haque",
    email: "junaid@example.com",
    date: "2026-01-15",
    ordersCount: 15,
    totalSpent: 1249.50,
    status: "Active",
  },
  {
    id: "USR-1002",
    name: "Sarah Connor",
    email: "sarah@example.com",
    date: "2026-03-22",
    ordersCount: 8,
    totalSpent: 450.00,
    status: "Active",
  },
  {
    id: "USR-1003",
    name: "John Doe",
    email: "john.doe@example.com",
    date: "2026-05-10",
    ordersCount: 1,
    totalSpent: 99.00,
    status: "Inactive",
  },
  {
    id: "USR-1004",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2025-11-05",
    ordersCount: 42,
    totalSpent: 8750.20,
    status: "Active",
  },
  {
    id: "USR-1005",
    name: "Alice Cooper",
    email: "alice@example.com",
    date: "2026-05-28",
    ordersCount: 0,
    totalSpent: 0.00,
    status: "Suspended",
  }
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const updateStatus = (userId: string, newStatus: User["status"]) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
  };

  const filteredUsers = users.filter((u) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower) ||
      u.id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-5 w-full min-h-screen overflow-x-hidden">
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-5 mb-6">
        <div className="flex items-center justify-start gap-2 text-stone-900">
          <Users2 size={28} />
          <h1 className="text-2xl font-medium">All Orders</h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <input
            className="w-[200px] rounded-full border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-700 focus:outline-2 focus:outline-stone-900"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button className="rounded-full bg-stone-900 px-3 py-2 text-sm text-stone-50 border-2 border-stone-900 focus:outline-stone-200 flex items-center justify-center gap-2" type="button">
            <SearchIcon size={20} /> Search
          </button>
        </div>
      </div>
      <div className="hidden md:block w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="min-w-175 w-full table-auto border-separate border-spacing-y-0">
          <thead className="bg-stone-100">
            <tr className="text-left text-sm uppercase tracking-[0.15em] text-stone-500">
              <th className="px-5 py-4">User ID</th>
              <th className="px-5 py-4">Joined Date</th>
              <th className="px-5 py-4">User Details</th>
              <th className="px-5 py-4">Total Orders</th>
              <th className="px-5 py-4">Total Spent</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="rounded-3xl overflow-hidden border border-stone-100 bg-white transition">
                <td className="px-5 py-5 align-top">
                  <div className="font-semibold text-stone-900">{user.id}</div>
                </td>
                <td className="px-5 py-5 align-top text-stone-700">{user.date}</td>
                <td className="px-5 py-5 align-top">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-700">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900">{user.name}</div>
                      <div className="text-xs text-stone-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 align-top text-stone-700">{user.ordersCount}</td>
                <td className="px-5 py-5 align-top text-stone-900 font-semibold">
                  ${user.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-5 align-top">
                  <select
                    value={user.status}
                    onChange={(e) => updateStatus(user.id, e.target.value as User["status"])}
                    className="rounded-full border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-700 focus:outline-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Suspended</option>
                  </select>
                </td>
                <td className="px-5 py-5 align-top text-right">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-stone-300 hover:text-stone-900"
                    aria-label="Show user details"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Card view for mobile */}
      <div className="block md:hidden space-y-5">
        {filteredUsers.map((user) => (
          <div key={user.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-700">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <span className="font-semibold text-stone-900 text-sm block">{user.name}</span>
                  <span className="text-[10px] text-stone-500">{user.email}</span>
                </div>
              </div>
              <span className="text-xs text-stone-500">{user.date}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-stone-500">ID: <b className="text-stone-900 font-semibold">{user.id}</b></span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-stone-700">Orders: <b>{user.ordersCount}</b></span>
              <span className="text-base font-bold text-stone-900">
                ${user.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <select
                  value={user.status}
                  onChange={(e) => updateStatus(user.id, e.target.value as User["status"])}
                  className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs text-stone-700 focus:outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 shadow-sm rounded-3xl border-2 border-stone-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 text-center md:text-left">User Summary</h3>
          <p className="text-sm text-stone-500 text-center md:text-left">Overview of user demographics and spending</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center md:text-right">
          <div>
            <p className="text-sm uppercase tracking-widest text-stone-500">Active Users</p>
            <p className="text-2xl font-bold text-stone-900">
              {users.filter(u => u.status === "Active").length} / {users.length}
            </p>
          </div>
          <div className="h-px w-8 bg-stone-200 sm:h-8 sm:w-px" />
          <div>
            <p className="text-sm uppercase tracking-widest text-stone-500">Total Customer Value</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${users.reduce((acc, u) => acc + u.totalSpent, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users