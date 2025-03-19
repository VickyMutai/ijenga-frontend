import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { CirclePlus, X } from "lucide-react";
import { AppDispatch } from "../reducers/store";
import { createLabourer, fetchLabourers } from "../reducers/labourerReducer";
import { useParams } from "react-router-dom";

const LABOURER_TITLES = [
  "welders",
  "aluminium_fabricators",
  "tiling_installer",
  "carpenters",
  "steel_fixers",
  "plant_mechanics",
  "plant_operators",
  "painters",
  "solar_water_installer",
  "scattolder",
  "structural_cabling_installer",
  "electrician",
  "plumber",
  "interior_designer",
  "civil_works",
  "masonry",
  "casual",
  "plasterers",
  "intern",
  "attache",
  "student",
];

const AddLaborerDetails = () => {
  const { id: workId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [validationErrors, setValidationErrors] = useState<{
    labourer_mpesa_number?: string;
  }>({});

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    labourer_name: "",
    national_id_number: "",
    labourer_title: "",
    labourer_mpesa_number: "",
    labourer_daily_rate: "",
    labourer_overhead_cost: "",
    number_of_days_worked: "",
  });

  if (!formData.labourer_mpesa_number.startsWith("254")) {
    validationErrors.labourer_mpesa_number =
      "Phone number must start with 254.";
  } else if (formData.labourer_mpesa_number.length !== 12) {
    validationErrors.labourer_mpesa_number =
      "Phone number must be exactly 12 digits.";
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    const errors: { labourer_mpesa_number?: string } = {};
    if (!formData.labourer_mpesa_number.startsWith("254")) {
      errors.labourer_mpesa_number = "Phone number must start with 254.";
    } else if (formData.labourer_mpesa_number.length !== 12) {
      errors.labourer_mpesa_number = "Phone number must be exactly 12 digits.";
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (!workId) return;

    const labourerData = {
      workId,
      ...formData,
      labourer_daily_rate: Number(formData.labourer_daily_rate),
    };

    const result = await dispatch(createLabourer(labourerData));

    if (createLabourer.fulfilled.match(result)) {
      dispatch(fetchLabourers(workId));
      setOpen(false);
    }
  };
  return (
    <div>
      <CirclePlus
        type="button"
        onClick={() => setOpen(true)}
        className="text-blue cursor-pointer hover:scale-105"
        size={28}
      />
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="flex justify-between items-center gap-7 mt-4 px-4">
                <h2 className="text-xl md:text-2xl font-bold text-blue">
                  Add Labourer
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-blue cursor-pointer" />
                </button>
              </div>
              <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <form className="space-y-2" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="labourer_name"
                    placeholder="Labourer Name"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="national_id_number"
                    placeholder="ID Number"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="labourer_title"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Title</option>
                    {[...LABOURER_TITLES]
                      .sort((a, b) => a.localeCompare(b)) // Sorting alphabetically
                      .map((title) => (
                        <option key={title} value={title}>
                          {title
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    name="labourer_mpesa_number"
                    placeholder="Mpesa Number"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.labourer_mpesa_number && (
                    <p className="text-red-600 text-sm mt-1">
                      {validationErrors.labourer_mpesa_number}
                    </p>
                  )}
                  <input
                    type="number"
                    name="labourer_daily_rate"
                    placeholder="Daily Rate"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  />{" "}
                  <input
                    type="number"
                    name="number_of_days_worked"
                    placeholder="Number of Days Worked"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="labourer_overhead_cost"
                    placeholder="Overhead Cost"
                    className="project-modal-input"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-900 transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddLaborerDetails;
