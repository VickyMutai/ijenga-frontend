import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducers/store";
import { createSubcontractedWork } from "../reducers/subcontractedWorksReducer";
import { HardHat } from "lucide-react";
import { TASK_CATEGORIES } from "../helpers/constants";

const CreateSubContractedWorks = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    task_title: "",
    task_description: "",
    task_category: "",
    task_cost_labor: "",
    task_cost_overhead: "",
  });

  if (!projectId) {
    console.error("No projectId found in URL");
    return <p>Project ID is required</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      createSubcontractedWork({
        project: projectId,
        task_title: formData.task_title,
        task_description: formData.task_description,
        task_category: formData.task_category || "other",
        task_cost_labor: Number(formData.task_cost_labor),
        task_cost_overhead: Number(formData.task_cost_overhead)
      })
    );    

    if (createSubcontractedWork.fulfilled.match(result)) {
      navigate(`/project-details/${projectId}`);
    }
  };

  return (
    <div className="py-6">
      <div className="w-[300px] md:w-[500px] mx-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71]">
        <div className="flex flex-col gap-1 items-center mb-8">
          <HardHat className="text-blue mb-2" size={30} />
          <h2 className="text-2xl md:text-3xl text-center font-bold text-blue">Create Subcontracted Works</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input type="text" id="task-title" name="task_title" value={formData.task_title} onChange={handleChange} className="project-modal-input" required />
          </div>
          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
            <textarea id="task-description" name="task_description" value={formData.task_description} onChange={handleChange} rows={3} className="project-modal-input"></textarea>
          </div>

          <div>
            <label htmlFor="task-category" className="block text-sm font-medium text-gray-700 mb-1">Task Category</label>
            <select id="task-category" name="task_category" value={formData.task_category} onChange={handleChange} className="project-modal-input" required>
              <option value="">Select a category</option>
              {TASK_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="task-cost-labor" className="block text-sm font-medium text-gray-700 mb-1">Task Cost Labour</label>
            <input type="number" id="task-cost-labor" name="task_cost_labor" value={formData.task_cost_labor} onChange={handleChange} className="project-modal-input" required />
          </div>
          <div>
            <label htmlFor="task-cost-overhead" className="block text-sm font-medium text-gray-700 mb-1">Task Cost Overhead</label>
            <input type="number" id="task-cost-overhead" name="task_cost_overhead" value={formData.task_cost_overhead} onChange={handleChange} className="project-modal-input" required />
          </div>
          <button type="submit" className="w-full cursor-pointer bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-800 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubContractedWorks;
