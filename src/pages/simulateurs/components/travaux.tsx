import { useState, useEffect } from "react";

import travauxData from "../items-travaux.json";

const Travaux = ({ nextStep }: any) => {
    const [selectedTravaux, setSelectedTravaux] = useState<string[]>([]);
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

    useEffect(() => {
        // Vérifie si au moins un travail est sélectionné
        setIsNextButtonVisible(selectedTravaux.length > 0);
    }, [selectedTravaux]);

    const handleTravauxSelect = (travaux: string) => {
        setSelectedTravaux((prev) => {
            if (prev.includes(travaux)) {
                return prev.filter((item) => item !== travaux); // Désélectionner
            } else {
                return [...prev, travaux]; // Sélectionner
            }
        });
    };

    // Regrouper les travaux par catégorie
    const groupedTravaux = travauxData.reduce((acc, curr) => {
        (acc[curr.categorie] = acc[curr.categorie] || []).push(curr);
        return acc;
    }, {} as Record<string, typeof travauxData>);

    return (
        <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
            <h3 className="text-2xl font-bold text-center mb-8">Travaux</h3>

            {Object.entries(groupedTravaux).map(([categorie, travaux]) => (
                <div key={categorie} className="mb-8">
                    <h4 className="text-xl font-bold mb-4">{categorie.charAt(0).toUpperCase() + categorie.slice(1)}</h4>
                    <div className="flex flex-col gap-4">
                        {travaux.map((travauxItem) => (
                            <div key={travauxItem.nom_travaux} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${selectedTravaux.includes(travauxItem.nom_travaux) ? "border-primary bg-secondary" : "border-gray-200 bg-white"}`} onClick={() => handleTravauxSelect(travauxItem.nom_travaux)}>
                                <input type="checkbox" id={travauxItem.nom_travaux} checked={selectedTravaux.includes(travauxItem.nom_travaux)} onChange={() => handleTravauxSelect(travauxItem.nom_travaux)} className="hidden" />
                                <label htmlFor={travauxItem.nom_travaux} className="flex gap-3 items-center cursor-pointer">
                                    <span className="text-lg font-semibold text-gray-800">{travauxItem.nom_travaux}</span>
                                </label>
                                <div className="ml-4">
                                    <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedTravaux.includes(travauxItem.nom_travaux) ? "border-primary" : "border-gray-400"}`}>{selectedTravaux.includes(travauxItem.nom_travaux) && <div className="w-3 h-3 bg-primary rounded-full"></div>}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {isNextButtonVisible && (
                <div className="text-center mt-8">
                    <button onClick={nextStep} className="px-8 py-4 bg-primary text-white font-bold rounded-lg">
                        Étape Suivante
                    </button>
                </div>
            )}
        </div>
    );
};

export default Travaux;
