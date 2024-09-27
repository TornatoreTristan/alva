import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils";

const Configuration = ({ nextStep }: { nextStep: () => void }) => {
  const [selectedLogement, setSelectedLogement] = useState("");
  const [shape, setShape] = useState("");
  const [adjacency, setAdjacency] = useState("");
  const [floors, setFloors] = useState("");
  const [surface, setSurface] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [type, setType] = useState("");
  const [facades, setFacades] = useState(2);

  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { logement, maison, appartement } = JSON.parse(logementData);
      setSelectedLogement(logement.selectedType);

      if (maison) {
        const { shape, adjacency, floors, surface } = maison;
        setShape(shape);
        setAdjacency(adjacency);
        setFloors(floors);
        setSurface(surface);
      }

      if (appartement) {
        const { emplacement, type, facades, surface } = appartement;
        setEmplacement(emplacement);
        setType(type);
        setFacades(facades);
        setSurface(surface);
      }
    }
  }, []);

  useEffect(() => {
    const maisonData = { shape, adjacency, floors, surface };
    updateSessionStorage("maison", maisonData);
  }, [shape, adjacency, floors, surface]);

  useEffect(() => {
    const appartementData = { emplacement, type, facades, surface };
    updateSessionStorage("appartement", appartementData);
  }, [emplacement, type, facades, surface]);

  const handleFacadeChange = (increment: boolean) => {
    setFacades((prev) => (increment ? prev + 1 : prev > 0 ? prev - 1 : 0));
  };

  const isNextButtonVisible = (selectedLogement === "maison" && shape && adjacency && floors && surface) || (selectedLogement === "appartement" && emplacement && type);

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Configuration de votre logement</h3>

      {selectedLogement === "maison" && (
        <>
          {/* Questions pour Maison */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4">Quelle est la forme de votre maison ?</h4>
            <div className="flex justify-center gap-8">
              {["Carrée ou rectangulaire", "Allongée ou en L", "Autre"].map((option) => (
                <div
                  key={option}
                  className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                    shape === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setShape(option)}
                >
                  <input type="radio" id={option} name="shape" value={option} checked={shape === option} onChange={() => setShape(option)} className="hidden" />
                  <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                    <span className="text-lg font-semibold text-gray-800">{option}</span>
                  </label>
                  <div className="ml-4">
                    <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${shape === option ? "border-primary" : "border-gray-400"}`}>
                      {shape === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {shape && (
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Est-elle mitoyenne ?</h4>
              <div className="flex justify-center gap-8">
                {["Non mitoyenne", "Mitoyenne sur 1 côté", "Mitoyenne sur 2 côtés"].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                      adjacency === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setAdjacency(option)}
                  >
                    <input type="radio" id={option} name="adjacency" value={option} checked={adjacency === option} onChange={() => setAdjacency(option)} className="hidden" />
                    <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                      <span className="text-lg font-semibold text-gray-800">{option}</span>
                    </label>
                    <div className="ml-4">
                      <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${adjacency === option ? "border-primary" : "border-gray-400"}`}>
                        {adjacency === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adjacency && (
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Combien d'étages possède-t-elle ?</h4>
              <div className="flex justify-center gap-8">
                {["Plain-pied", "1 étage", "2 étages ou plus"].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                      floors === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setFloors(option)}
                  >
                    <input type="radio" id={option} name="floors" value={option} checked={floors === option} onChange={() => setFloors(option)} className="hidden" />
                    <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                      <span className="text-lg font-semibold text-gray-800">{option}</span>
                    </label>
                    <div className="ml-4">
                      <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${floors === option ? "border-primary" : "border-gray-400"}`}>
                        {floors === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {selectedLogement === "appartement" && (
        <>
          {/* Questions pour Appartement */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4">Emplacement de l'appartement</h4>
            <div className="flex justify-center gap-8">
              {["Rez-de-chaussée", "Intermédiaire", "Dernier étage"].map((option) => (
                <div
                  key={option}
                  className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                    emplacement === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setEmplacement(option)}
                >
                  <input type="radio" id={option} name="emplacement" value={option} checked={emplacement === option} onChange={() => setEmplacement(option)} className="hidden" />
                  <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                    <span className="text-lg font-semibold text-gray-800">{option}</span>
                  </label>
                  <div className="ml-4">
                    <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${emplacement === option ? "border-primary" : "border-gray-400"}`}>
                      {emplacement === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {emplacement && (
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Type d'appartement</h4>
              <div className="flex justify-center gap-8">
                {["Simple", "Duplex", "Triplex"].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                      type === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setType(option)}
                  >
                    <input type="radio" id={option} name="type" value={option} checked={type === option} onChange={() => setType(option)} className="hidden" />
                    <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                      <span className="text-lg font-semibold text-gray-800">{option}</span>
                    </label>
                    <div className="ml-4">
                      <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${type === option ? "border-primary" : "border-gray-400"}`}>
                        {type === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type && (
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Nombre de façades donnant sur l'extérieur</h4>
              <div className="flex justify-center items-center gap-4">
                <button onClick={() => handleFacadeChange(false)} className="px-4 py-2 border rounded-lg">
                  -
                </button>
                <div className="text-2xl font-bold">{facades}</div>
                <button onClick={() => handleFacadeChange(true)} className="px-4 py-2 border rounded-lg">
                  +
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {floors && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Quelle est sa surface habitable ?</h4>
          <div className="flex justify-center">
            <input
              type="text"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              placeholder="Entrez votre surface habitable en m²"
              className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
            />
          </div>
          {surface && <p className="text-primary mt-2">Surface habitable enregistrée: {surface} m²</p>}
        </div>
      )}

      {isNextButtonVisible && (
        <div className="mt-8 flex justify-center">
          <button onClick={nextStep} className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all">
            Étape suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default Configuration;
