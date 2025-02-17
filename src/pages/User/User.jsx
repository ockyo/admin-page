import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ToggleSwitch from "../../componets/ToggleSwitch";
import { Modal } from "../../componets/Modal";
import UserDataServices from "../../services/UserService/UserDataServices";
import Notification from "../Nofication/Notification";

const User = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        idTiktok: "",
        isActive: true, // Thêm isActive cho trường hợp chỉnh sửa
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // GET LIST USER
    const fetchUsers = async () => {
        try {
            const data = await UserDataServices.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // CHANGE STATUS USER
    const changeStatus = async (id, status) => {
        try {
            await UserDataServices.changStatusUser(id, status);
            setNotification({
                message: "Change status successfully!",
                type: "success",
            });
        } catch (error) {
            setNotification({
                message: "Change status fail, please try again!",
                type: "error",
            });
        }
    };

    // CREATE USER
    const createUser = async (username, password) => {
        try {
            const newUser = {
                userName: username,
                password: password,
            };
            await UserDataServices.createUser(newUser);
            setNotification({
                message: "Add user successfully!",
                type: "success",
            });
            closeModal();
            fetchUsers(); // Refresh user list
        } catch (error) {
            setNotification({
                message: "Add user failed!",
                type: "error",
            });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Updating
    const handleToggle = (id, newState) => {
        changeStatus(id, newState);
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, isActive: newState } : user
        );
        setUsers(updatedUsers);
    };

    const handleCloseNotification = () => {
        setNotification(null); // Close notification when hidden
    };

    const openModal = (type, user) => {
        setModalType(type);
        setSelectedUser(user);
        setIsModalOpen(true);
        if (type === "edit") {
            setFormData({
                username: user.userName,
                email: user.email || "",
                idTiktok: user.idTiktok || "",
                isActive: user.isActive,
            });
        } else {
            setFormData({
                username: "",
                email: "",
                idTiktok: "",
                isActive: true,
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setFormData({
            username: "",
            email: "",
            idTiktok: "",
            isActive: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (modalType === "add") {
            createUser(formData.username, formData.password);
        } else if (modalType === "edit" && selectedUser) {
            // Update logic can be added here for editing user
            console.log("Editing user:", formData);
            closeModal();
        }
    };
    const handleDelete = async (userId) => {
        try {
            await UserDataServices.deleteUser(userId); // Giả sử có phương thức deleteUser trong dịch vụ của bạn
            setNotification({
                message: "User deleted successfully!",
                type: "success",
            });
            fetchUsers(); // Cập nhật lại danh sách người dùng sau khi xóa
        } catch (error) {
            setNotification({
                message: "Failed to delete user, please try again.",
                type: "error",
            });
        }
    };
    const handleDeleteConfirm = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            handleDelete(id);
        }
    };
    
    return (
        <div>
            <div className="container mx-auto p-4">
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={handleCloseNotification}
                    />
                )}

                <div>
                    <button
                        className="bg-red-100 rounded-md p-2 mb-2 border-2 border-blue-600 hover:bg-blue-600"
                        onClick={() => openModal("add")}
                    >
                        CREATE USER
                    </button>
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
                                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4">{user.userName}</td>
                                    <td className="px-6 py-4">{user.idTiktok}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <ToggleSwitch
                                                defaultState={user.isActive}
                                                onToggle={(newState) => handleToggle(user.id, newState)} // Update state when toggled
                                            />
                                            <span
                                                className={`w-16 text-sm font-semibold ${
                                                    user.isActive ? "text-green-600" : "text-gray-500"
                                                }`}
                                            >
                                                {user.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="text-blue-600 hover:underline mr-2"
                                            onClick={() => openModal("edit", user)}
                                        >
                                            <PencilIcon className="w-5 h-5 text-blue-600" />
                                        </button>

                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => handleDeleteConfirm(user.id)}
                                        >
                                            <TrashIcon className="w-5 h-5 text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === "add" ? "CREATE NEW USER FOR ACTION APP" : "Edit User"}>
                {modalType === "add" ? (
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-semibold">{modalType === "add" ? "CREATE NEW USER FOR ACTION APP" : "Edit User"}</h2>
                        </div>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            value={formData.username}
                            className="border p-2 w-full mb-4"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            value={formData.password}
                            className="border p-2 w-full mb-4"
                        />

                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
                            disabled={!formData.username || !formData.password}
                        >
                            CREATE USER
                        </button>
                    </form>
                ) : (
                    selectedUser && (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    value={formData.username || selectedUser.userName}
                                    onChange={handleChange}
                                    className="border p-2 w-full mb-4"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="idTiktok" className="block mb-2">ID TikTok</label>
                                <input
                                    type="text"
                                    name="idTiktok"
                                    placeholder="Enter ID TikTok"
                                    value={formData.idTiktok || selectedUser.idTiktok}
                                    onChange={handleChange}
                                    className="border p-2 w-full mb-4"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Status</label>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive !== undefined ? formData.isActive : selectedUser.isActive}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span>{formData.isActive !== undefined ? (formData.isActive ? 'Active' : 'Inactive') : (selectedUser.isActive ? 'Active' : 'Inactive')}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                            >
                                Save Changes
                            </button>
                        </form>
                    )
                )}
            </Modal>

            
        </div>
    );
};

export default User;
