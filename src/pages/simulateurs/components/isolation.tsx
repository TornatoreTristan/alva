import { useState, useEffect } from "react";
import { updateSessionStorage } from "../utils/simulateur-utils";

const Isolation = ({ nextStep }: any) => {
  const [isMaison, setIsMaison] = useState(false);
  const [isAppartement, setIsAppartement] = useState(false);
  const [murIsolation, setMurIsolation] = useState("");
  const [toiture, setToiture] = useState("");
  const [combles, setCombles] = useState("");
  const [sousSol, setSousSol] = useState("");
  const [facades, setFacades] = useState(0);
  const [fenetres, setFenetres] = useState(0);
  const [vitrage, setVitrage] = useState("");

  const [showToiture, setShowToiture] = useState(false);
  const [showCombles, setShowCombles] = useState(false);
  const [showSousSol, setShowSousSol] = useState(false);
  const [showFacades, setShowFacades] = useState(false);
  const [showFenetres, setShowFenetres] = useState(false);
  const [showVitrage, setShowVitrage] = useState(false);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

  useEffect(() => {
    const logementData = sessionStorage.getItem("logementData");
    if (logementData) {
      const { logement, isolation } = JSON.parse(logementData);
      const { selectedType } = logement;

      // const logementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");
      setIsMaison(selectedType === "maison");
      setIsAppartement(selectedType === "appartement");

      setMurIsolation(isolation?.murIsolation || "");
      setToiture(isolation?.toiture || "");
      setCombles(isolation?.combles || "");
      setSousSol(isolation?.sousSol || "");
      setFacades(isolation?.facades || 0);
      setFenetres(isolation?.fenetres || 0);
      setVitrage(isolation?.vitrage || "");
    }
  }, []);

  useEffect(() => {
    // Sauvegarder les données dans sessionStorage
    const isolationData = {
      murIsolation,
      toiture,
      combles,
      sousSol,
      facades,
      fenetres,
      vitrage,
    };
    updateSessionStorage("isolation", isolationData);

    if (murIsolation) setShowToiture(true);
    if (toiture) setShowCombles(true);
    if (combles) setShowSousSol(true);
    if (sousSol) setShowFacades(true);
    if (facades > 0) setShowFenetres(true);
    if (fenetres > 0) setShowVitrage(true);

    // Si toutes les options sont remplies, on affiche tout directement
    if (murIsolation && toiture && combles && sousSol && facades && fenetres && vitrage) {
      setShowToiture(true);
      setShowCombles(true);
      setShowSousSol(true);
      setShowFacades(true);
      setShowFenetres(true);
      setShowVitrage(true);
    }

    if (isMaison && murIsolation && toiture && combles && sousSol && vitrage) {
      setIsNextButtonVisible(true);
    } else if (isAppartement && murIsolation && vitrage) {
      setIsNextButtonVisible(true);
    } else {
      setIsNextButtonVisible(false);
    }
  }, [murIsolation, toiture, combles, sousSol, fenetres, facades, vitrage]);

  const handleFacadeChange = (increment: boolean) => {
    setFacades((prev) => (increment ? prev + 1 : prev > 0 ? prev - 1 : 0));
  };

  const handleFenetresChange = (increment: boolean) => {
    setFenetres((prev) => (increment ? prev + 1 : prev > 0 ? prev - 1 : 0));
  };

  const handleMurIsolationSelect = (option: string) => {
    setMurIsolation(option);
    setShowToiture(true);
  };

  const handleToitureSelect = (option: string) => {
    setToiture(option);
    setShowCombles(true);
  };

  const handleComblesSelect = (option: string) => {
    setCombles(option);
    setShowSousSol(true);
  };

  const handleSousSolSelect = (option: string) => {
    setSousSol(option);
    setShowFacades(true);
  };

  const handleFacadesChange = () => {
    setShowFenetres(true);
  };

  const handleFenetresChangeComplete = () => {
    setShowVitrage(true);
  };

  const handleVitrageSelect = (option: string) => {
    setVitrage(option);
  };

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">Isolation du bâti</h3>

      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4">Dernière isolation des murs</h4>
        <div className="flex justify-center gap-8">
          {["- de 10 ans", "+ de 10 ans", "Aucun travaux"].map((option) => (
            <div
              key={option}
              className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                murIsolation === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
              }`}
              onClick={() => handleMurIsolationSelect(option)}
            >
              <input type="radio" id={`murs-${option}`} name="murIsolation" value={option} checked={murIsolation === option} onChange={() => handleMurIsolationSelect(option)} className="hidden" />
              <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                <span className="text-lg font-semibold text-gray-800">{option}</span>
              </label>
              <div className="ml-4">
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${murIsolation === option ? "border-primary" : "border-gray-400"}`}>
                  {murIsolation === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showToiture && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Type de toiture</h4>
          <div className="flex justify-center gap-8">
            {["Combles perdus", "Combles aménagés", "Toit terrasse"].map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  toiture === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleToitureSelect(option)}
              >
                <input type="radio" id={`toit-${option}`} name="toiture" value={option} checked={toiture === option} onChange={() => handleToitureSelect(option)} className="hidden" />
                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{option}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${toiture === option ? "border-primary" : "border-gray-400"}`}>
                    {toiture === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCombles && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Dernière isolation des combles</h4>
          <div className="flex justify-center gap-8">
            {["- de 10 ans", "+ de 10 ans", "Aucun travaux"].map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  combles === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleComblesSelect(option)}
              >
                <input type="radio" id={`combles-${option}`} name="combles" value={option} checked={combles === option} onChange={() => handleComblesSelect(option)} className="hidden" />
                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{option}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${combles === option ? "border-primary" : "border-gray-400"}`}>
                    {combles === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSousSol && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Type de sous-sol</h4>
          <div className="flex justify-center gap-8">
            {["Terre-plein", "Vide sanitaire", "Sous-sol non chauffé"].map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  sousSol === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleSousSolSelect(option)}
              >
                <input type="radio" id={option} name="sousSol" value={option} checked={sousSol === option} onChange={() => handleSousSolSelect(option)} className="hidden" />
                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{option}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${sousSol === option ? "border-primary" : "border-gray-400"}`}>
                    {sousSol === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFacades && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Nombre de façades</h4>
          <div className="flex justify-center items-center gap-4">
            <button onClick={() => handleFacadeChange(false)} className="px-4 py-2 border rounded-lg">
              -
            </button>
            <div className="text-2xl font-bold">{facades}</div>
            <button
              onClick={() => {
                handleFacadeChange(true);
                handleFacadesChange();
              }}
              className="px-4 py-2 border rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      )}

      {showFenetres && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Nombre de fenêtres</h4>
          <div className="flex justify-center items-center gap-4">
            <button onClick={() => handleFenetresChange(false)} className="px-4 py-2 border rounded-lg">
              -
            </button>
            <div className="text-2xl font-bold">{fenetres}</div>
            <button
              onClick={() => {
                handleFenetresChange(true);
                handleFenetresChangeComplete();
              }}
              className="px-4 py-2 border rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      )}

      {showVitrage && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Type de vitrage</h4>
          <div className="flex justify-center gap-8">
            {["Simple", "Double", "Triple"].map((option) => (
              <div
                key={option}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  vitrage === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"
                }`}
                onClick={() => handleVitrageSelect(option)}
              >
                <input type="radio" id={`vitrage-${option}`} name="vitrage" value={option} checked={vitrage === option} onChange={() => handleVitrageSelect(option)} className="hidden" />
                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{option}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${vitrage === option ? "border-primary" : "border-gray-400"}`}>
                    {vitrage === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}
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

export default Isolation;
