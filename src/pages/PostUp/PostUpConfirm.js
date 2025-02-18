import React from "react";
import { createPortal } from "react-dom";

const PostUpConfirm = ({ message, onConfirm, onClose }) => {
    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => { onConfirm(true); onClose(); }}
                    >
                        Yes
                    </button>
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => { onConfirm(false); onClose(); }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PostUpConfirm;
