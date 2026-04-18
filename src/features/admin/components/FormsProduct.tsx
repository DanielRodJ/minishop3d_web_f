// FormsProduct.tsx
import type { ChangeEvent } from "react";
import type { AddProductCommand } from "../../../types/ProductCommand";
import { InputText } from "../../../components/shared/inputs/InputText";
import { InputTextArea } from "../../../components/shared/inputs/InputTextArea";
import { DatePicker } from "../../../components/shared/inputs/DatePicker";
import { InputNumber } from "../../../components/shared/inputs/InputNumber";

type Props = {
  formData: AddProductCommand;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};


const FormAddRecord = ({ formData, handleChange, handleSubmit, onClose }: Props) => {

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-4xl rounded-xl p-6 shadow-2xl">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          Añadir un nuevo producto
        </h2>

        <hr className="border-t border-gray-200 my-4" />

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">

          {/* 🔹 Información básica */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Información general</h3>

            <InputText
              id="nombreProducto"
              name="nombreProducto"
              placeholder="Nombre del producto"
              value={formData.nombreProducto}
              onChange={handleChange}
            />

            <InputTextArea
              id="descripcionProducto"
              name="descripcionProducto"
              placeholder="Descripción del producto"
              value={formData.descripcionProducto}
              onChange={handleChange}
            />
          </div>

          {/* 🔹 Datos técnicos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Datos técnicos</h3>

            <div className="grid grid-cols-2 gap-4">
              <InputText
                id="escalaBase"
                name="escalaBase"
                placeholder="Escala base"
                value={formData.escalaBase}
                onChange={handleChange}
              />

              <InputText
                id="autorNombre"
                name="autorNombre"
                placeholder="Autor"
                value={formData.autorNombre}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputNumber
                id="costoProduccionBase"
                name="costoProduccionBase"
                placeholder="Costo producción"
                value={formData.costoProduccionBase}
                onChange={handleChange}
              />

              <InputNumber
                id="filamentoUsoBase"
                name="filamentoUsoBase"
                placeholder="Filamento"
                value={formData.filamentoUsoBase}
                onChange={handleChange}
              />
            </div>

            <DatePicker
              id="fechaLanzamiento"
              name="fechaLanzamiento"
              value={formData.fechaLanzamiento}
              onChange={handleChange}
            />
          </div>

          {/* 🔹 Footer */}
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-black"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Guardar producto
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormAddRecord