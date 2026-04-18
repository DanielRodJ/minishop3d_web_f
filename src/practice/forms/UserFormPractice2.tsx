import type { ChangeEvent } from 'react';
import { useState } from 'react';

type PersonalInfo = {
    nombre: string;
    email: string;
    telefono?: string;
    telefonoEmergencia?: string;
    dirreccion: {
        ciudad: string;
        pais: string;
    }
}

interface ContactInfoProps {
    nombre: string;
    email: string;
    telefono?: string;
    telefonoEmergencia?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface AddressInfoProps {
    ciudad: string;
    pais: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoComponent = ({ nombre, email, telefono, telefonoEmergencia, onChange }: ContactInfoProps) => {
    return (
        <>
            <input name='nombre' value={nombre} onChange={onChange}></input>
            <input name='email' value={email} onChange={onChange}></input>
            <input name='telefono' value={telefono} onChange={onChange}></input>
            <input name='telefonoEmergencia' value={telefonoEmergencia} onChange={onChange}></input>
        </>
    );
}

const AddressInfoComponent = ({ ciudad, pais, onChange }: AddressInfoProps) => {
    return (
        <>
            <input name='ciudad' value={ciudad} onChange={onChange}></input>
            <input name='pais' value={pais} onChange={onChange}></input>
        </>
    );
}

const SubmitButton = () => {
    return <button type='submit'>Enviar</button>;
}

export const UserFormPractice = () => {

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        nombre: 'Sin nombre',
        email: 'Sin email',
        telefono: undefined,
        telefonoEmergencia: undefined,
        dirreccion: {
            ciudad: 'Sin ciudad',
            pais: 'Sin pais',
        }
    });

    const handlePerosnalInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setPersonalInfo((prev) => ({
            ...prev,
            [name]: name === 'telefono' || name === 'telefonoEmergencia' ? Number(value) : value,
        }))
    }

    return (
        <div>
            <h1>Formulario de Usuario</h1>
            <PersonalInfoComponent nombre={personalInfo.nombre} email={personalInfo.email} telefono={personalInfo.telefono} telefonoEmergencia={personalInfo.telefonoEmergencia} onChange={handlePerosnalInfoChange} />
            <AddressInfoComponent ciudad={personalInfo.dirreccion.ciudad} pais={personalInfo.dirreccion.pais} onChange={handlePerosnalInfoChange} />
            <SubmitButton />
        </div>
    );
}