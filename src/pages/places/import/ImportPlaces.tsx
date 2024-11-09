import { ChangeEvent, useState } from "react";
import { importJson } from "../../../services/places";

const ImportPlaces = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/json') {
            setFile(selectedFile);
        } else {
            alert('Por favor, selecciona un archivo JSON');
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Por favor, selecciona un archivo JSON primero.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setStatus(''); // Limpiar el estado de error o éxito

        try {
            await importJson(file)
        } catch (error) {
            setStatus('Hubo un error al cargar el archivo.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Cargar archivo JSON</h2>
            <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
            />
            <br />
            <button
                onClick={handleFileUpload}
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Subir JSON'}
            </button>
            <br />
            {status && <p>{status}</p>}
        </div>
    );
}

export default ImportPlaces