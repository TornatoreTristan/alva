import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils"; // Assurez-vous que ce fichier est correctement défini pour gérer le stockage

const Situation = ({ nextStep }: { nextStep: () => void }) => {
  const [isOwner, setIsOwner] = useState("");
  const [isOccupant, setIsOccupant] = useState("");
  const [isOwnerForLocataire, setIsOwnerForLocataire] = useState("");
  const [nbrOccupant, setNbrOccupant] = useState("");
  const [revenue, setRevenue] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { situation } = JSON.parse(logementData);
      setIsOwner(situation?.isOwner);
      setIsOccupant(situation?.isOccupant);
      setIsOwnerForLocataire(situation?.isOwnerForLocataire);
      setNbrOccupant(situation?.nbrOccupant);
      setRevenue(situation?.revenue);
    }
  }, []);

  useEffect(() => {
    const situationData = {
      isOwner,
      isOccupant,
      isOwnerForLocataire,
      nbrOccupant,
      revenue,
    };
    updateSessionStorage("situation", situationData);
  }, [isOwner, isOccupant, isOwnerForLocataire, revenue, nbrOccupant]);

  useEffect(() => {
    if (isOwner == "Non" || isOwnerForLocataire == "Non") {
      // console.log(isOwnerForLocataire, isOwner);
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [isOwner, isOwnerForLocataire]);

  const handleOwnerChange = (value: string) => {
    setIsOwner(value);
  };

  const handleOwnerForLocatairerChange = (value: string) => {
    setIsOwnerForLocataire(value);
  };

  const handleOccupantChange = (value: string) => {
    setIsOccupant(value);
  };

  const handleRevenueSelect = (value: string) => {
    setRevenue(value);
  };

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Votre situation</h3>

      <div className="mb-8">
        <h4 className="text-2xl font-bold text-center mb-4">Êtes-vous propriétaire ?</h4>
        <div className="flex justify-center gap-8">
          {["Oui", "Non"].map((option: string) => (
            <div
              key={option}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                isOwner === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
              }`}
              onClick={() => handleOwnerChange(option)}
            >
              <input type="radio" id={option} name="climatisation" value={option} checked={isOwner === option} onChange={() => handleOwnerChange(option)} className="hidden" />
              <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{option}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${isOwner === option ? "border-primary" : "border-gray-400"}`}>
                  {isOwner === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-2xl font-bold text-center mb-4">Vivez-vous dans le logement à rénover ?</h4>
        <div className="flex justify-center gap-8">
          {["Oui", "Non"].map((option: string) => (
            <div
              key={option}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                isOccupant === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
              }`}
              onClick={() => handleOccupantChange(option)}
            >
              <input type="radio" id={option} name="climatisation" value={option} checked={isOccupant === option} onChange={() => handleOccupantChange(option)} className="hidden" />
              <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{option}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${isOccupant === option ? "border-primary" : "border-gray-400"}`}>
                  {isOccupant === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOccupant === "Non" && (
        <div className="mb-8">
          <h4 className="text-2xl font-bold text-center mb-4">Le logement est-il la résidence principale du locataire ?</h4>
          <div className="flex justify-center gap-8">
            {["Oui", "Non"].map((option: string) => (
              <div
                key={option}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  isOwnerForLocataire === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleOwnerForLocatairerChange(option)}
              >
                <input
                  type="radio"
                  id={option}
                  name="climatisation"
                  value={option}
                  checked={isOwnerForLocataire === option}
                  onChange={() => handleOwnerForLocatairerChange(option)}
                  className="hidden"
                />
                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{option}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${isOwnerForLocataire === option ? "border-primary" : "border-gray-400"}`}>
                    {isOwnerForLocataire === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-2xl font-bold text-center mb-4">Quel est votre revenu fiscal de référence ?</h4>
        <div className="flex justify-center gap-2">
          {["inférieur à 32 003€", "inférieur à 40 003€", "inférieur à 51 282€", "inférieur à 72 401€", "supérieur à 72 401€"].map((revenueOption) => (
            <div
              key={revenueOption}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                revenue === revenueOption ? "border-primary bg-secondary" : "border-gray-200 text-sm bg-white"
              }`}
              onClick={() => handleRevenueSelect(revenueOption)}
            >
              <input
                type="radio"
                id={revenueOption}
                name="constructionrevenueOption"
                value={revenueOption}
                checked={revenue === revenueOption}
                onChange={() => handleRevenueSelect(revenueOption)}
                className="hidden"
              />
              <label htmlFor={revenueOption} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{revenueOption}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${revenue === revenueOption ? "border-primary" : "border-gray-400"}`}>
                  {revenue === revenueOption && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Quelle est la composition de votre ménage ?</h3>
        <div className="flex justify-center">
          <input
            type="number"
            value={nbrOccupant}
            onChange={(e) => setNbrOccupant(e.target.value)}
            placeholder="Nombre de personne vivant dans le logement"
            className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
          />
        </div>
      </div>

      {showMessage && (
        <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
          <h3 className="text-2xl font-bold text-center mb-8">Impossible d'avoir une aide dans cette situation</h3>
        </div>
      )}

      {isOwner == "Oui" && isOccupant !== null && nbrOccupant !== null && revenue && (
        <div className="mt-8 flex justify-center">
          <button onClick={nextStep} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all">
            Étape suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default Situation;
