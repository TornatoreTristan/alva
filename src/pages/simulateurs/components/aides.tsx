import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils"; // Assurez-vous que ce fichier est correctement défini pour gérer le stockage
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineHomeModern } from "react-icons/hi2";

const DemandeAideFinanciere = ({ nextStep }: { nextStep: () => void }) => {
  const [isOwner, setIsOwner] = useState("");
  const [isOccupant, setIsOccupant] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [livingArea, setLivingArea] = useState(0);
  const [selectedYear, setSelectedYear] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [revenue, setRevenue] = useState("");

  useEffect(() => {
    const formData = sessionStorage.getItem("demandeAideData");
    if (formData) {
      const { demande } = JSON.parse(formData);
      setIsOwner(demande.isOwner);
      setIsOccupant(demande.isOccupant);
      setSelectedType(demande.selectedType);
      setLivingArea(demande.livingArea);
      setSelectedYear(demande.selectedYear);
      setPostalCode(demande.postalCode);
      setRevenue(demande.revenue);
    }
  }, []);

  useEffect(() => {
    const demandeAideData = {
      isOwner,
      isOccupant,
      selectedType,
      livingArea,
      selectedYear,
      postalCode,
      revenue,
    };
    updateSessionStorage("demandeAide", demandeAideData);
  }, [isOwner, isOccupant, selectedType, livingArea, selectedYear, postalCode, revenue]);

  const handleOwnerChange = (value: boolean) => {
    setIsOwner(value);
  };

  const handleOccupantChange = (value: boolean) => {
    setIsOccupant(value);
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleLivingAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLivingArea(value ? parseInt(value) : null);
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
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

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Le logement est-il une maison ou un appartement ?</h3>
        <div className="flex justify-center gap-8">
          <div
            className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedType === "maison" ? "border-primary bg-secondary" : "border-gray-200 bg-white"
            }`}
            onClick={() => handleSelectType("maison")}
          >
            <input type="radio" id="maison" name="type" value="maison" checked={selectedType === "maison"} onChange={() => handleSelectType("maison")} className="hidden" />
            <label htmlFor="maison" className="flex gap-3 items-center cursor-pointer">
              <HiOutlineHomeModern className="text-secondary w-10 h-10" />
              <span className="text-lg font-semibold text-gray-800">Maison</span>
            </label>
            <div className="ml-4">
              <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedType === "maison" ? "border-primary" : "border-gray-400"}`}>
                {selectedType === "maison" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedType === "appartement" ? "border-primary bg-secondary" : "border-gray-200 bg-white"
            }`}
            onClick={() => handleSelectType("appartement")}
          >
            <input type="radio" id="appartement" name="type" value="appartement" checked={selectedType === "appartement"} onChange={() => handleSelectType("appartement")} className="hidden" />
            <label htmlFor="appartement" className="flex gap-3 items-center cursor-pointer">
              <HiOutlineBuildingOffice2 className=" w-10 h-10" />
              <span className="text-lg font-semibold text-gray-800">Appartement</span>
            </label>
            <div className="ml-4">
              <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedType === "appartement" ? "border-primary" : "border-gray-400"}`}>
                {selectedType === "appartement" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Quelle est la surface habitable du logement ?</h3>
        <div className="flex justify-center">
          <input
            type="number"
            value={livingArea || ""}
            onChange={handleLivingAreaChange}
            placeholder="Nombre en m²"
            className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
          />
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-2xl font-bold text-center mb-4">De quand date la construction du logement à rénover ?</h4>
        <div className="flex justify-center gap-2">
          {["Moins de 2 ans", "De 2 à 15 ans", "De 15 à 25 ans", "Au moins 25 ans"].map((year) => (
            <div
              key={year}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                selectedYear === year ? "border-primary bg-secondary" : "border-gray-200 text-sm bg-white"
              }`}
              onClick={() => handleYearSelect(year)}
            >
              <input type="radio" id={year} name="constructionYear" value={year} checked={selectedYear === year} onChange={() => handleYearSelect(year)} className="hidden" />
              <label htmlFor={year} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{year}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedYear === year ? "border-primary" : "border-gray-400"}`}>
                  {selectedYear === year && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Quel est votre code postal ?</h3>
        <div className="flex justify-center">
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
            placeholder="Entrez votre code postal"
            className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
          />
        </div>
        {postalCode.length !== 5 && <p className="text-primary mt-2 text-center text-sm">Veuillez entrer un code postal valide de 5 chiffres.</p>}
      </div>

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

      {isOwner !== null && isOccupant !== null && selectedType && livingArea !== null && selectedYear && postalCode && revenue && (
        <div className="mt-8 flex justify-center">
          <button onClick={nextStep} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all">
            Étape suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default DemandeAideFinanciere;
