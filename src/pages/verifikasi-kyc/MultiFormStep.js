import React, { useState } from "react";
import { useForm } from "react-hook-form";

const MultiStepForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onChange", // Mengecek validasi saat nilai input berubah
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [step, setStep] = useState(1);

  const handleNext = async () => {
    const isValid = await trigger(); // Memicu validasi sebelum pindah ke langkah berikutnya
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <p>Multi step</p>
    </>
  );
};

export default MultiStepForm;
