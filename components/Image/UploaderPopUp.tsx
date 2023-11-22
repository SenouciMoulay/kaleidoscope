import { X } from "lucide-react";
import { Uploader } from "./Uploader";

interface UploaderPopUpProps {
  onClose: () => void;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  open: boolean;
}

export function UploaderPopUp(
  {
    onClose,
    onUpload,
    multiple,
    open
  }: UploaderPopUpProps
) {



  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center
    ${open ? "visible" : "invisible"}
    `} >

      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center gap-4 relative">
        <Uploader onUpload={onUpload} multiple={multiple} />
        <div className="absolute -top-3 -right-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-red-50"
          >
            <X />
          </button>
        </div>
      </div>
    </div >
  );


}
