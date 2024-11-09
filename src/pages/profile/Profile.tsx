import { useState } from "react";
import { uploadProfileImage } from "../../services/users";

const Profile = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Selecciona un archivo primero");
            return;
        }

        try {
            await uploadProfileImage(file);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }
    };

    return (
        <div>
            <h2>Subir Imagen de Perfil</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir Imagen</button>
        </div>
    );
}

export default Profile