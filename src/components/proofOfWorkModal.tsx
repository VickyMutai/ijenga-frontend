import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducers/store";
import { uploadProofOfWork } from "../reducers/proofOfWorksReducer";

interface ProofOfWorkModalProps {
  workId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProofOfWorkModal: React.FC<ProofOfWorkModalProps> = ({ workId, isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image!");
      return;
    }
  
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("description", description);
  
    try {
      setLoading(true);
      await dispatch(uploadProofOfWork({ workId, formData }));
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <DialogPanel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue">Upload Proof of Work</h2>
            <button onClick={onClose} className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
              <X className="h-5 w-5 text-blue" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4" encType="multipart/form-data">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />

            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="project-modal-input w-full"
            ></textarea>

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-800 transition duration-300"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProofOfWorkModal;
