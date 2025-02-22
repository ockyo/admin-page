import apiService from "../ApiBaseService";
class GiftDataService {
    getAllGifts() {
        return apiService.get("/Gift/GetListGift");
    }
    deleteGift(giftId) {
        return apiService.delete(`/Gift/DeleteGift/?id=${giftId}`);
    }
    createGift(newGift) {
        return apiService.post("/Gift/CreateGift", newGift);
    }
}

const giftDataService = new GiftDataService()
export default giftDataService;