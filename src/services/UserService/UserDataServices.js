import apiService from "../ApiBaseService";

class UserDataService {
  getAllUsers() {
    return apiService.get("/Account/GetAllUser");
  }

  changStatusUser(id, status) {
    return apiService.patch(`/Account/ChangStatusUser?id=${id}&status=${status}`);
}

  resetKey(id){
    return apiService.patch(`/Account/ResetKey?id=${id}`);
  }

  resetPassword(id){
    return apiService.patch(`/Account/ResetPassword?id=${id}`);
  }

  createUser(newUser) {
    return apiService.post("/Account/AddUser", newUser);
  }

  updateUser(data) {
    return apiService.patch("/Account/UpdateUser", data);
  }

  deleteUser(id) {
    return apiService.delete(`/Account/DeleteUser?id=${id}`);
  }
}

export default new UserDataService();
