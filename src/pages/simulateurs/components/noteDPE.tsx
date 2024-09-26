import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils";

const NoteDEP = ({ nextStep }: any) => {
  const [selectedNoteDEP, setSelectedNoteDEP] = useState<string | null>(null); // Une seule note sélectionnée
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  // Charger la note DPE depuis sessionStorage au montage
  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { noteDEP } = JSON.parse(logementData);
      if (noteDEP) {
        setSelectedNoteDEP(noteDEP); // Restaurer la note DPE si elle existe
      }
    }
  }, []);

  // Mettre à jour sessionStorage lorsque la note DPE change
  useEffect(() => {
    if (selectedNoteDEP) {
      updateSessionStorage("noteDEP", selectedNoteDEP); // Sauvegarder dans sessionStorage
    }
  }, [selectedNoteDEP]);

  // Vérifie si une note est sélectionnée pour afficher le bouton Suivant
  useEffect(() => {
    setIsNextButtonVisible(!!selectedNoteDEP); // Afficher le bouton si une note est sélectionnée
  }, [selectedNoteDEP]);

  const handleNoteSelect = (note: string) => {
    setSelectedNoteDEP(note); // Sélectionner une note
  };

  const notes = ["A", "B", "C", "D", "E", "F", "G"]; // Notes DPE possibles

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Sélectionnez la note DPE</h3>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {notes.map((note) => (
          <div
            key={note}
            className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedNoteDEP === note ? "border-primary bg-secondary" : "border-gray-200 bg-white"
            }`}
            onClick={() => handleNoteSelect(note)}
          >
            <input type="radio" id={note} name="noteDEP" value={note} checked={selectedNoteDEP === note} onChange={() => handleNoteSelect(note)} className="hidden" />
            <label htmlFor={note} className="flex gap-3 items-center cursor-pointer">
              <span className="text-lg font-semibold text-gray-800">{note}</span>
            </label>
            <div className="ml-4">
              <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedNoteDEP === note ? "border-primary" : "border-gray-400"}`}>
                {selectedNoteDEP === note && <div className="w-3 h-3 bg-primary rounded-full"></div>}
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default NoteDEP;
