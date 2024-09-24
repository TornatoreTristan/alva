import { useState, useEffect } from "react";

interface FormData {
    nom: string;
    adresse: string;
    revenuFiscal: string;
    typeTravaux: string;
    typeLogement: string;
    surfaceLogement: string;
    anneeConstruction: string;
    nombreOccupants: string;
}

interface Errors {
    [key: string]: string;
}

interface AidesTravauxFormProps {
    nextStep: () => void;
}

const AidesTravauxForm: React.FC<AidesTravauxFormProps> = ({ nextStep }) => {
    const [formData, setFormData] = useState<FormData>({
        nom: "",
        adresse: "",
        revenuFiscal: "",
        typeTravaux: "",
        typeLogement: "",
        surfaceLogement: "",
        anneeConstruction: "",
        nombreOccupants: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    useEffect(() => {
        const savedFormData = sessionStorage.getItem("aidesTravauxData");
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("aidesTravauxData", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate fields when changed
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        let fieldErrors: Errors = { ...errors };

        if (!value) {
            fieldErrors[name] = "Ce champ est obligatoire";
        } else {
            delete fieldErrors[name];
        }

        setErrors(fieldErrors);
        checkFormValidity(fieldErrors);
    };

    const checkFormValidity = (errors: Errors) => {
        const noErrors = Object.keys(errors).length === 0;
        const allFieldsFilled = Object.values(formData).every((field) => field !== "");

        setCanSubmit(noErrors && allFieldsFilled);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (canSubmit) {
            nextStep();
        } else {
            alert("Veuillez remplir correctement tous les champs.");
        }
    };

    return (
        <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
            <h3 className="text-2xl font-bold text-center mb-8">Formulaire pour les aides aux travaux énergétiques</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div>
                    <label className="block text-lg font-semibold">Nom:</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required />
                    {errors.nom && <p className="text-red-500">{errors.nom}</p>}
                </div>

                {/* Adresse */}
                <div>
                    <label className="block text-lg font-semibold">Adresse:</label>
                    <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required />
                    {errors.adresse && <p className="text-red-500">{errors.adresse}</p>}
                </div>

                {/* Revenu Fiscal */}
                <div>
                    <label className="block text-lg font-semibold">Revenu fiscal de référence:</label>
                    <input type="number" name="revenuFiscal" value={formData.revenuFiscal} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required />
                    {errors.revenuFiscal && <p className="text-red-500">{errors.revenuFiscal}</p>}
                </div>

                {/* Type de travaux */}
                <div>
                    <label className="block text-lg font-semibold">Type de travaux:</label>
                    <select name="typeTravaux" value={formData.typeTravaux} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required>
                        <option value="">-- Sélectionner --</option>
                        <option value="Isolation">Isolation</option>
                        <option value="Chauffage">Chauffage</option>
                        <option value="Ventilation">Ventilation</option>
                        <option value="Fenêtres">Fenêtres</option>
                    </select>
                    {errors.typeTravaux && <p className="text-red-500">{errors.typeTravaux}</p>}
                </div>

                {/* Type de logement */}
                <div>
                    <label className="block text-lg font-semibold">Type de logement:</label>
                    <select name="typeLogement" value={formData.typeLogement} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required>
                        <option value="">-- Sélectionner --</option>
                        <option value="Appartement">Appartement</option>
                        <option value="Maison">Maison</option>
                    </select>
                    {errors.typeLogement && <p className="text-red-500">{errors.typeLogement}</p>}
                </div>

                {/* Surface du logement */}
                <div>
                    <label className="block text-lg font-semibold">Surface du logement (m²):</label>
                    <input type="number" name="surfaceLogement" value={formData.surfaceLogement} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required />
                    {errors.surfaceLogement && <p className="text-red-500">{errors.surfaceLogement}</p>}
                </div>

                {/* Année de construction */}
                <div>
                    <label className="block text-lg font-semibold">Année de construction:</label>
                    <input type="number" name="anneeConstruction" value={formData.anneeConstruction} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required />
                    {errors.anneeConstruction && <p className="text-red-500">{errors.anneeConstruction}</p>}
                </div>

                {/* Nombre d'occupants */}
                <div>
                    <label className="block text-lg font-semibold">Nombre d'occupants:</label>
                    <input type="number" name="nombreOccupants" value={formData.nombreOccupants} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:border-primary" required />
                    {errors.nombreOccupants && <p className="text-red-500">{errors.nombreOccupants}</p>}
                </div>

                {/* Submit button */}
                <div className="mt-8 flex justify-center">
                    <button type="submit" className={`px-6 py-3 bg-primary text-white font-bold rounded-lg ${canSubmit ? "hover:bg-secondary" : "opacity-50 cursor-not-allowed"} transition-all`} disabled={!canSubmit}>
                        Soumettre
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AidesTravauxForm;
