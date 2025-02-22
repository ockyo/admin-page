import Swal from 'sweetalert2';

const ConfirmButton = ({ children, itemName, onConfirm }) => {
    const confirmAction = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    position: "top-end",
                    text: `${itemName} has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                if (onConfirm) {
                    onConfirm();
                }
            }
        });
    };


    return <button onClick={confirmAction}> {children} </button>;
};

export default ConfirmButton;