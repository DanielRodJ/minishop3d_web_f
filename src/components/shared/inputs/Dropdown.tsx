import { useEffect, useState } from "react";
import Select from "react-select";
import { getAcabadosMaterial } from "../../../services/ApiCatalogs";

type Option = {
    value: string;
    label: string;
};

export const DropdownExample = () => {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAcabadosMaterial();

                const mapped: Option[] = data.map((item) => ({
                    value: item.codigo,
                    label: item.nombre
                }));

                setOptions(mapped);
            } catch (error) {
                console.error("Error al cargar acabados de material:", error);
            }
        };

        loadData();
    }, []);

    return <Select options={options} />;
};