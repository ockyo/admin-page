import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ToggleSwitch from "../../componets/ToggleSwitch";
import UserDataServices from "../../services/UserService/UserDataServices";
import Notification from "../Nofication/Notification";
import ConfirmDialog from "../PostUp/ConfirmDialog";
import CreateAccountForm from "../PostUp/CreateAccountForm"
import ResetAccountForm from "../PostUp/ResetAccountForm";
const User = () => {
    const [edit, setEdit] = useState(false); 
    const [userId, setUserId] = useState(null); 
    const [users, setUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [notification, setNotification] = useState(null);
    const [showForm, setShowForm] = useState(false);

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
            setShowForm(false);
            fetchUsers(); // Refresh user list
        } catch (error) {
            setNotification({
                message: "Add user failed!",
                type: "error",
            });
        }
    };
    
    //Reset Pass
    const resetPass = async() =>{
        try{
            await UserDataServices.resetPassword(userId);
            setNotification({
                message: "Reset PassWord Successfully!",
                type: "success",
            });
            setEdit(false); 
        }
        catch(error){
            setNotification({
                message: "Reset PassWord Fail!",
                type: "error",
            });
        }
    }

    //Reset Pass
    const resetAuthenKey = async() =>{
        try{
            await UserDataServices.resetKey(userId);
            setNotification({
                message: "Reset Key Successfully!",
                type: "success",
            });
            setEdit(false); 
        }
        catch(error){
            setNotification({
                message: "Reset Key Fail!",
                type: "error",
            });
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const selectUser = (id) => {
        setUserId(id);
        setEdit(true);
      };

    // Updating status user
    const handleToggle = (id, newState) => {
        changeStatus(id, newState);
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, isActive: newState } : user
        );
        setUsers(updatedUsers);
    };

    const handleCloseNotification = () => {
        setNotification(null);
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
        setUserToDelete(id); 
        setShowConfirm(true);
    };

    const handleCreateAccount = (data) => {
        createUser(data.username,data.password);
      };

    const handleResetPassword = () => {
        resetPass();
      };
    
    const handleResetAuthKey = () => {
        resetAuthenKey();
      };

    const handleConfirm = (result) => {
        if (result && userToDelete !== null) {
        handleDelete(userToDelete);
        }
        setShowConfirm(false);
      };

    const handleCancel = () => {
        setShowConfirm(false); 
        setShowForm(false);
        setEdit(false);
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
                        onClick={() => setShowForm(true)}
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
                                    ID-TIkTOK
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Day Active
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Time Login
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
                                    {new Date(user.timeActive).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-6 py-4">
                                    {new Date(user.lastLogin).toLocaleString('en-GB', { 
                                        timeZone: 'Asia/Bangkok', 
                                        day: '2-digit', 
                                        month: '2-digit', 
                                        year: 'numeric',
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        hour12: false 
                                    })}
                                    </td>
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
                                            onClick={() => selectUser(user.id)}
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

            {showConfirm && (
                                        <ConfirmDialog
                                        message="Delete User ?"
                                        onConfirm={handleConfirm}
                                        onCancel={handleCancel}
                                        />
            )}

            {edit && userId && ( 
        <ResetAccountForm
          userId={userId} 
          onResetPassword={handleResetPassword}
          onResetAuthKey={handleResetAuthKey}
          onCancel={handleCancel}
        />
            )}

              {showForm && (
                <CreateAccountForm
                onCreate={handleCreateAccount}
                onCancel={handleCancel}
                />
            )}

        </div>
    );
};

export default User;
