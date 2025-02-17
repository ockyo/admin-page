import React, { useState, useEffect } from "react";
import axios from "axios";
import ToggleSwitch from "../../componets/ToggleSwitch";
import { Modal } from "../../componets/Modal";
import UserDataServices from "../../services/UserService/UserDataServices";
const User = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    // const BASE_URL = process.env.REACT_APP_API_URL;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const fetchUsers = async () => {
        try {
            const data = await UserDataServices.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    //updating
    const handleToggle = (id, newState) => {
        // Cập nhật trạng thái isActive của user trong danh sách
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, isActive: newState } : user
        );
        setUsers(updatedUsers);
    };
    const openModal = (type, user) => {
        setModalType(type);
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // const handleEditUser = (user) => {
    //     setSelectedUser(user);
    //     setIsModalOpen(true);
    //     console.log("opened");
    // };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn load lại trang
        console.log("Dữ liệu form:", formData); 
    };
    return (
        <div>
            <div className="container mx-auto p-4">
                <div >
                    <button className="bg-red-100 rounded-md p-2 mb-2 border-2 border-blue-600 hover:bg-blue-600 " onClick={() => openModal("add")} >Add user</button>
                </div>

                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name user
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    id-tiktok
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">{user.userName}</td>
                                    <td className="px-6 py-4">{user.idTiktok}</td>
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">
                                            <ToggleSwitch
                                                defaultState={user.isActive}
                                                onToggle={(newState) => handleToggle(user.id, newState)} // Cập nhật trạng thái khi toggle
                                            />
                                            <span className={`w-16 text-sm font-semibold ${user.isActive ? "text-green-600" : "text-gray-500"}`}>
                                                {user.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>

                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:underline" onClick={() => openModal("edit", user)}>
                                            Edit user
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === "add" ? "Add New User" : "Edit User"}>
                {modalType === "add" ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            className="border p-2 w-full mb-4"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            className="border p-2 w-full mb-4"
                        />

                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
                    </form>
                ) : (
                    selectedUser && (
                        <div>
                            <p><strong>Username:</strong> {selectedUser.userName}</p>
                            <p><strong>ID TikTok:</strong> {selectedUser.idTiktok}</p>
                            <p><strong>Permission:</strong> {selectedUser.isAdmin ? "Admin" : "User"}</p>
                            <p><strong>Status:</strong> {selectedUser.isActive ? "Active" : "Inactive"}</p>
                            <p><strong>Profile OBS:</strong> {selectedUser.profileObs}</p>
                        </div>
                    )
                )}
            </Modal>

        </div>
    )
}

export default User