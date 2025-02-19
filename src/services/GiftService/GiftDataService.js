import apiService from "../ApiBaseService";
class GiftDataService {
    getAllGifts() {
        return apiService.get("/Gift/GetListGift");
    }
}
export default new GiftDataService();