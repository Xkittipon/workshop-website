import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";

const UserTable = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(users);
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: userStatus ? false : true,
    };
    changeUserStatus(token, value)
      .then((res) => {
        toast.success(
          `User ${userStatus ? "disabled" : "enabled"} successfully!`
        );
        console.log(res);
        handleGetUsers(token);
      })
      .catch((err) => {
        toast.error("Failed to change user status");
        console.log(err);
      });
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        toast.success(`User role changed to ${value.role} successfully!`);
        console.log(res);
        handleGetUsers(token);
      })
      .catch((err) => {
        toast.error("Failed to change user role");
        console.log(err);
      });
  };
  return (
    <div className="p-4 bg-white m-auto shadow-md rounded-sm">
      <h1 className="text-2xl font-bold my-3">User Management</h1>
      <table className="w-full border">
        <thead className="border bg-gray-100">
          <tr>
            <th className="p-1">No</th>
            <th>Email</th>
            {/*<th>Updated At</th>*/}
            <th>Promise</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {users?.map((item, index) => (
            <tr key={index} className=" border hover:bg-gray-50  ">
              <td>{index + 1}</td>
              <td>{item.email}</td>
              {/*<td>{item.updatedAt}</td>*/}
              <td>
                <select
                  onChange={(e) =>
                    handleChangeUserRole(item.id, e.target.value)
                  }
                  className="ml-2 focus:outline-none focus:ring-2 "
                  value={item.role}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td>{item.enabled ? "Enable" : "Disable"}</td>
              <td>
                <button
                  className={`${
                    item.enabled ? "bg-red-400" : "bg-green-400"
                  } text-white px-3 py-1 rounded`}
                  onClick={() => handleChangeUserStatus(item.id, item.enabled)}
                >
                  {item.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
