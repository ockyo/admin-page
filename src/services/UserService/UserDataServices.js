import apiService from "../ApiBaseService";

class UserDataService {
  getAllUsers() {
    return apiService.get("/Account/GetAllUser");
  }

  changStatusUser(id, status) {
    return apiService.patch(`/Account/ChangStatusUser?id=${id}&status=${status}`);
}
//   getUserById(id) {
//     return apiService.get(`/users/${id}`);
//   }

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
