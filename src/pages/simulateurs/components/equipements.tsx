import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils";

const Equipements = ({ nextStep }: any) => {
  const [isMaison, setIsMaison] = useState(false);
  const [isAppartement, setIsAppartement] = useState(false);
  const [chauffageEnergie, setChauffageEnergie] = useState("");
  const [eauChaudeEnergie, setEauChaudeEnergie] = useState("");

  const [showEauChaudeEnergie, setShowEauChaudeEnergie] = useState(false);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { logement, equipements } = JSON.parse(logementData);
      setIsMaison(logement.selectedType === "maison");
      setIsAppartement(logement.selectedType === "appartement");
      setChauffageEnergie(equipements?.chauffageEnergie || "");
      setEauChaudeEnergie(equipements?.eauChaudeEnergie || "");
    }
  }, []);

  useEffect(() => {
    const equipementsData = { chauffageEnergie, eauChaudeEnergie };
    updateSessionStorage("equipements", equipementsData);

    if (chauffageEnergie) setShowEauChaudeEnergie(true);
    if (chauffageEnergie && eauChaudeEnergie) {
      setIsNextButtonVisible(true);
    }
  }, [chauffageEnergie, eauChaudeEnergie]);

  const handleChauffageEnergieSelect = (option: string) => {
    setChauffageEnergie(option);
    setShowEauChaudeEnergie(true);
  };

  const handleEauChaudeEnergieSelect = (option: string) => {
    setEauChaudeEnergie(option);
  };

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Mes équipements et énergies</h3>

      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4">Énergie utilisée pour le chauffage</h4>
        <div className="flex justify-center flex-wrap gap-8">
          {["Gaz", "Fioul", "Électricité", "bois", "Pompe à chaleur"].map((option) => (
            <div
              key={option}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                chauffageEnergie === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
              }`}
              onClick={() => handleChauffageEnergieSelect(option)}
            >
              <input
                type="radio"
                id={`chauffage-${option}`}
                name="chauffageEnergie"
                value={option}
                checked={chauffageEnergie === option}
                onChange={() => handleChauffageEnergieSelect(option)}
                className="hidden"
              />
              <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{option}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${chauffageEnergie === option ? "border-primary" : "border-gray-400"}`}>
                  {chauffageEnergie === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEauChaudeEnergie && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Énergie utilisée pour l'eau chaude</h4>
          <div className="flex justify-center flex-wrap gap-8">
            {["Gaz", "Fioul", "Électricité", "Pompe à chaleur", "Chauffe-eau thermodynamique"].map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  eauChaudeEnergie === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleEauChaudeEnergieSelect(option)}
              >
                <input
                  type="radio"
                  id={`eauchaude-${option}`}
                  name="eauChaudeEnergie"
                  value={option}
                  checked={eauChaudeEnergie === option}
                  onChange={() => handleEauChaudeEnergieSelect(option)}
                  className="hidden"
                />
                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{option}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${eauChaudeEnergie === option ? "border-primary" : "border-gray-400"}`}>
                    {eauChaudeEnergie === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default Equipements;
