import apiService from "../ApiBaseService";

class UserDataService {
  getAllUsers() {
    return apiService.get("/Account/GetAllUser");
  }

//   getUserById(id) {
//     return apiService.get(`/users/${id}`);
//   }

//   createUser(data) {
//     return apiService.post("/users", data);
//   }

//   updateUser(id, data) {
//     return apiService.put(`/users/${id}`, data);
//   }

//   deleteUser(id) {
//     return apiService.delete(`/users/${id}`);
//   }
}

export default new UserDataService();
