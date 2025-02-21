import apiService from "../ApiBaseService";
class ActionService{
    getInfoDashboar() {
        return apiService.get("/ActionConfig/GetInfoApp");
      }
}
export default new ActionService();