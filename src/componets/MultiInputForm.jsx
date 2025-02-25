import Swal from 'sweetalert2';

const MultiInputForm = ({ onSubmit }) => {
  const handleSubmit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create gift',
      html: ` 
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <label>Gift ID: <input id="swal-giftId" class="swal2-input" type="number" placeholder="Enter Gift ID" /></label>
          <label>Name: <input id="swal-name" class="swal2-input" placeholder="Enter Name" /></label>
          <label>Type: <input id="swal-type" class="swal2-input" type="number" placeholder="Enter Type" /></label>
          <label>Coin: <input id="swal-coin" class="swal2-input" type="number" placeholder="Enter Coin Amount" /></label>
          <label>Gift URL: <input id="swal-giftUrl" class="swal2-input" placeholder="Enter Gift URL" /></label>
        </div>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        return {
          giftId: Number(document.getElementById('swal-giftId').value),
          name: document.getElementById('swal-name').value,
          type: Number(document.getElementById('swal-type').value),
          coin: Number(document.getElementById('swal-coin').value),
          giftUrl: document.getElementById('swal-giftUrl').value,
        };
      },
    });

    if (formValues && onSubmit) {
      onSubmit(formValues);
    }
  };
  return (
    <button
      onClick={handleSubmit}
      className="bg-blue-500 text-white p-2 rounded-lg"
    >
      Add Gift
    </button>
  );

};

export default MultiInputForm;
