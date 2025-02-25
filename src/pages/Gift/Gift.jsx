import React, { useEffect, useState } from 'react'
import GiftDataService from '../../services/GiftService/GiftDataService';
import Pagination from '../../componets/Pagination';
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmButton from '../../componets/comfirmButton';
import MultiInputForm from '../../componets/MultiInputForm';
import Swal from 'sweetalert2';

function Gift() {
    const [gifts, setGifts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchGifts = async () => {
        try {
            const data = await GiftDataService.getAllGifts();
            setGifts(data);
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    };

    const handleDeleteGift = async (giftId) => {
        try {
            await GiftDataService.deleteGift(giftId);
            fetchGifts();
        } catch (error) {
            console.log("Error deleting gift:", error);
        }
    };
    const handleCreateGift = async (newGift) => {
        try {
            await GiftDataService.createGift(newGift);
            fetchGifts();
            console.log(newGift);
            Swal.fire({
                title: 'Success!',
                text: 'Gift created successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.log("Error creating gift:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create gift.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    useEffect(() => { fetchGifts(); }, []);

    const totalPages = Math.ceil(gifts.length / itemsPerPage);
    const currentGifts = gifts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <div className="container mx-auto p-4">
            <div>
                <MultiInputForm onSubmit={handleCreateGift} />

            </div>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-12">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3 w-48">
                                Name Gift
                            </th>
                            <th scope="col" className="px-6 py-3 w-32">
                                Img
                            </th>
                            <th scope="col" className="px-6 py-3 w-24">
                                Value
                            </th>
                            <th scope="col" className="px-6 py-3 w-24">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGifts.map((gift, index) => (
                            <tr key={gift.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4">{gift.name}</td>
                                <td className="px-6 py-4">
                                    <img src={gift.giftUrl} alt={gift.name} className="w-10 h-10 object-cover rounded" />
                                </td>
                                <td className="px-6 py-4">{gift.coin}</td>
                                <td className="px-6 py-4">
                                    <ConfirmButton itemName="Your gift" onConfirm={() => handleDeleteGift(gift.id)}>
                                        <TrashIcon className="w-5 h-5 text-red-600" />
                                    </ConfirmButton>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center items-center'>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>

        </div>
    );
}

export default Gift