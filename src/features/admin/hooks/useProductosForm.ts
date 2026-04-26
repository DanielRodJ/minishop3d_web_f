import { useEffect, useState, type ChangeEvent } from "react";
import type {
  AddProductoCommand,
  UpdateProductoCommand
} from "../../../types/ProductCommand";
import {
  addProductoAsync,
  updateProductoAsync
} from "../services/ProductoApi";

/* =========================================================
   Base
   ========================================================= */

const useProductoFormBase = <T extends object>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: ["costoProduccionBase", "filamentoUsoBase"].includes(name)
        ? Number(value)
        : value
    } as T));
  };

  return {
    formData,
    setFormData,
    handleChange
  };
};

/* =========================================================
   Helpers
   ========================================================= */

const getInitial = (): AddProductoCommand => ({
  nombreProducto: "",
  descripcionProducto: "",
  escalaBase: "",
  costoProduccionBase: 0,
  filamentoUsoBase: 0,
  autorNombre: undefined,
  fechaLanzamiento: "",
  coleccionId: undefined
});

/* =========================================================
   Hook: Creación deProducto
   ========================================================= */

type AddProps = {
  onSuccess?: () => void;
};

export const useAddProductoForm = ({ onSuccess }: AddProps) => {
  const { formData, setFormData, handleChange } =
    useProductoFormBase<AddProductoCommand>(getInitial());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addProductoAsync(formData);
      onSuccess?.();
      setFormData(getInitial());
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};

/* =========================================================
   Hook: Actualización de Producto
   ========================================================= */

type UpdateProps = {
  initialData: UpdateProductoCommand; // obligatorio
  onSuccess?: () => void;
};

export const useUpdateProductoForm = ({
  initialData,
  onSuccess
}: UpdateProps) => {
  const { formData, setFormData, handleChange } =
    useProductoFormBase<UpdateProductoCommand>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, setFormData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProductoAsync(formData);
      onSuccess?.();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};