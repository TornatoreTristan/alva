import { useState, useEffect } from "react";
import { updateSessionStorage, updateSessionStorageValue } from "../utils/simulateur-utils"; // Assurez-vous que ce fichier est correctement défini pour gérer le stockage

const Supplementaire = ({ nextStep }: { nextStep: () => void }) => {
  const [surface, setSurface] = useState(0);
  const [priceWork, setPriceWork] = useState(0);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedNewNoteDPE, setSelectedNewNoteDPE] = useState<string | null>(null);

  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { supplementaire, maison, appartement, montant_travaux, noteDPENew } = JSON.parse(logementData);
      if (montant_travaux > 0) {
        setPriceWork(montant_travaux);
      }
      if (maison?.surface) {
        setSurface(maison.surface);
      }
      if (appartement?.surface) {
        setSurface(appartement.surface);
      }
      setSelectedYear(supplementaire?.selectedYear);
      setSelectedNewNoteDPE(noteDPENew);
    }
  }, []);

  useEffect(() => {
    const supplementaireData = { selectedYear };
    updateSessionStorage("supplementaire", supplementaireData);
  }, [selectedYear]);

  useEffect(() => {
    updateSessionStorage("noteDPENew", selectedNewNoteDPE);
  }, [selectedNewNoteDPE]);

  useEffect(() => {
    updateSessionStorageValue("maison", "surface", surface);
    updateSessionStorageValue("appartement", "surface", surface);
  }, [surface]);

  useEffect(() => {
    updateSessionStorage("montant_travaux", priceWork);
  }, [priceWork]);

  const handleNoteSelect = (note: string) => {
    setSelectedNewNoteDPE(note); // Sélectionner une note
  };

  const notes = ["A", "B", "C", "D", "E", "F", "G"];

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Supplémentaire</h3>

      {/* Surface habitable */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Quelle est la surface habitable du logement ?</h3>
        <div className="flex justify-center">
          <input
            type="number"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            placeholder="Nombre en m²"
            className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
          />
        </div>
      </div>

      {/* Année de construction */}
      <div className="mt-8">
        <h4 className="text-2xl font-bold text-center mb-4">De quand date la construction du logement à rénover ?</h4>
        <div className="flex justify-center gap-2">
          {["Moins de 2 ans", "De 2 à 15 ans", "De 15 à 25 ans", "Au moins 25 ans"].map((year) => (
            <div
              key={year}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                selectedYear === year ? "border-primary bg-secondary" : "border-gray-200 text-sm bg-white"
              }`}
              onClick={() => setSelectedYear(year)}
            >
              <input type="radio" id={year} name="constructionYear" value={year} checked={selectedYear === year} className="hidden" />
              <label htmlFor={year} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{year}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">Quelle est le montant des travaux ?</h3>
        <div className="flex justify-center">
          <input
            type="number"
            value={priceWork}
            onChange={(e) => setPriceWork(parseInt(e.target.value))}
            placeholder="Montant travaux"
            className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-4">DPE Visé après travaux ?</h3>
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {notes.map((note) => (
            <div
              key={note}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                selectedNewNoteDPE === note ? "border-primary bg-secondary" : "border-gray-200 bg-white"
              }`}
              onClick={() => handleNoteSelect(note)}
            >
              <input type="radio" id={note} name="noteDPE" value={note} checked={selectedNewNoteDPE === note} onChange={() => handleNoteSelect(note)} className="hidden" />
              <label htmlFor={note} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{note}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedNewNoteDPE === note ? "border-primary" : "border-gray-400"}`}>
                  {selectedNewNoteDPE === note && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Afficher le bouton "Étape suivante" uniquement si tous les champs requis sont remplis */}
      {surface && selectedYear && priceWork && selectedNewNoteDPE && (
        <div className="mt-8 flex justify-center">
          <button onClick={nextStep} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all">
            Étape suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default Supplementaire;
