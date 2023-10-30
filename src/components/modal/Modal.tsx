import React, { useEffect, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  imagesurl: string[]; // Assurez-vous que le tableau est de type "string"
}

const urlApi = "http://localhost:1337";

const Modal: React.FC<ModalProps> = ({onClose, imagesurl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (event.key === 'Escape') {
        handleCloseClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, onClose]);
  
  useEffect(() => {
    if(imagesurl && imagesurl.length){
      setLoading(false);
    }
}, 
  [imagesurl])

  const handleNextImage = () => {
    if (currentImageIndex < imagesurl.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  function handleCloseClick() {
    onClose();
    setCurrentImageIndex(0);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
      <div className="modal relative">
        {loading ? (
          <div className="loader border-t-2 rounded-full border-white-500 animate-spin
          aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
        ) : (
          <>
            <div className="image-container flex relative">
              <img
                className="rounded-2xl select-none"
                src={`${urlApi}${imagesurl[currentImageIndex]}`}
                alt={`Image ${currentImageIndex + 1}`}
              />
              <div className="flex flex-row absolute w-full h-full">
                <div className="flex flex-1" onClick={handlePrevImage}></div>
                <div className="flex flex-1" onClick={handleNextImage}></div>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <button
                onClick={handleCloseClick}
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-black-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 hover:opacity-10"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
        <div className="image-navigation">
          {/* ... Vos boutons de navigation d'image */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
