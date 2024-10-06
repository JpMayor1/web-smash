import { useState } from "react";

const CreateTrainingModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    title: "",
    description: "",
  });

  return <div>CreateTrainingModal</div>;
};

export default CreateTrainingModal;
