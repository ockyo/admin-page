import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
    const [users, setUsers] = useState([]); // Dữ liệu người dùng
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal
    const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn để chỉnh sửa

    // Lấy dữ liệu người dùng từ API khi component được mount
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Hiển thị trạng thái loading
            const token = sessionStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:5222/Account/GetAllUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); // Gọi API
                setUsers(response.data);// Lưu dữ liệu người dùng vào state
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false); // Kết thúc trạng thái loading
            }
        };

        fetchUsers();
    }, []);


    // Hàm xử lý khi nhấn nút Edit User
    const handleEditUser = (user) => {
        setSelectedUser(user); // Lưu thông tin người dùng được chọn
        setIsModalOpen(true); // Mở modal
        console.log("opened");
    };
    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null); // Xóa thông tin người dùng được chọn
    };
    return (
        <div>
            {/* User page */}
            <div className="container mx-auto p-4">
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
                                        <div class="flex items-center">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full me-2 ${user.isActive === true ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            ></div>
                                            {user.isActive === true ? "active" : "inactive"}
                                        </div>

                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:underline" onClick={() => handleEditUser(user)}>
                                            Edit user
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                        {selectedUser && (
                            <div>
                                <p><strong>Username:</strong> {selectedUser.userName}</p>
                                <p><strong>ID TikTok:</strong> {selectedUser.idTiktok}</p>
                                <p><strong>Permission:</strong> {selectedUser.isAdmin ? "Admin" : "User"}
                                </p> <p><strong>Status:</strong> {selectedUser.isActive ? "Active" : "Inactive"}</p>
                                <p><strong>Profile OBS:</strong> {selectedUser.profileObs}</p>

                            </div>
                        )}
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default User