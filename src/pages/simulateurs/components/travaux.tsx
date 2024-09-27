import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils";
import travauxData from "../data/items-travaux.json";

const Travaux = ({ nextStep }: any) => {
  const [selectedTravaux, setSelectedTravaux] = useState<string[]>([]);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  // Charger les travaux sélectionnés depuis le sessionStorage au montage du composant
  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { travaux } = JSON.parse(logementData);
      if (travaux) {
        setSelectedTravaux(travaux);
      }
    }
  }, []);

  // Mettre à jour sessionStorage lorsque les travaux changent
  useEffect(() => {
    updateSessionStorage("travaux", selectedTravaux);
  }, [selectedTravaux]);

  // Vérifie si au moins un travail est sélectionné pour afficher le bouton Suivant
  useEffect(() => {
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

  // Récupérer les données de logement
  const logementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");

  // Conditions de filtrage
  const hasDoubleOrTripleVitrage = logementData.isolation?.vitrage === "Double" || logementData.isolation?.vitrage === "Triple";
  const hasRecentMursIsolation = logementData.isolation?.murIsolation === "- de 10 ans";
  const hasRecentCombleIsolation = logementData.isolation?.combles === "- de 10 ans";
  const hasRecentSolIsolation = logementData.isolation?.sousSol === "Terre-plein";
  const hasVmcDoubleFlux = logementData.ventilation?.ventilationType === "VMC double flux";
  const hasEfficientChauffage = logementData.equipements?.chauffageEnergie === "Pompe à chaleur" || logementData.equipements?.chauffageEnergie === "Bois";
  const hasEfficientChauffageEau = logementData.equipements?.eauChaudeEnergie === "Chauffe-eau thermodynamique";

  // Filtrer les travaux
  const filteredTravaux = travauxData.filter((travauxItem) => {
    if (travauxItem.name.includes("Fenêtres") && hasDoubleOrTripleVitrage) return false;
    if (travauxItem.name.includes("Isolation des murs") && hasRecentMursIsolation) return false;
    if (travauxItem.name.includes("VMC double flux") && hasVmcDoubleFlux) return false;
    if (travauxItem.name.includes("combles") && hasRecentCombleIsolation) return false;
    if (travauxItem.name.includes("chaleur") && hasEfficientChauffage) return false;
    if (travauxItem.name.includes("Chauffe") && hasEfficientChauffageEau) return false;
    if (travauxItem.name.includes("Isolation des sols") && hasRecentSolIsolation) return false;
    return true;
  });

  // Mettre à jour le sessionStorage si des travaux sélectionnés ne sont plus valides
  useEffect(() => {
    const invalidTravaux = selectedTravaux.filter((travaux) => !filteredTravaux.some((item) => item.name === travaux));

    if (invalidTravaux.length > 0) {
      const updatedTravaux = selectedTravaux.filter((travaux) => !invalidTravaux.includes(travaux));
      setSelectedTravaux(updatedTravaux);
      updateSessionStorage("travaux", updatedTravaux); // Met à jour le sessionStorage
    }
  }, [filteredTravaux, selectedTravaux]);

  // Regrouper les travaux par catégorie
  const groupedTravaux = filteredTravaux.reduce((acc, curr) => {
    (acc[curr.category] = acc[curr.category] || []).push(curr);
    return acc;
  }, {} as Record<string, typeof travauxData>);

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Travaux</h3>

      {Object.entries(groupedTravaux).map(([category, travaux]) => (
        <div key={category} className="mb-8">
          <h4 className="text-xl font-bold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
          <div className="flex flex-col gap-4">
            {travaux.map((travauxItem) => (
              <div
                key={travauxItem.name}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedTravaux.includes(travauxItem.name) ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleTravauxSelect(travauxItem.name)}
              >
                <input type="checkbox" id={travauxItem.name} checked={selectedTravaux.includes(travauxItem.name)} onChange={() => handleTravauxSelect(travauxItem.name)} className="hidden" />
                <label htmlFor={travauxItem.name} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{travauxItem.name}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedTravaux.includes(travauxItem.name) ? "border-primary" : "border-gray-400"}`}>
                    {selectedTravaux.includes(travauxItem.name) && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
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
