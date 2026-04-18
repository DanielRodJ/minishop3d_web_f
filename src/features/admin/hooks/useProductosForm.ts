import { useState, type ChangeEvent } from "react";
import type { AddProductCommand } from "../../../types/ProductCommand";
import { addProductoAsync } from "../services/ProductApi";

type UseProductosFormProps = {
  onSuccess?: () => void;
};

export const useProductosForm = ({ onSuccess }: UseProductosFormProps = {}) => {

  const getInitialFormData = (): AddProductCommand => ({
    nombreProducto: "",
    descripcionProducto: "",
    escalaBase: "",
    costoProduccionBase: 0,
    filamentoUsoBase: 0,
    autorNombre: undefined,
    fechaLanzamiento: "",
    coleccionId: undefined
  });

  const [formData, setFormData] = useState(getInitialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: ["costoProduccionBase", "filamentoUsoBase"].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addProductoAsync(formData);

      onSuccess?.();

      setFormData(getInitialFormData());

    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};