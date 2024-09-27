import { useEffect, useState } from "react";
import travauxData from "../data/items-travaux.json"; // Fichier JSON contenant les données sur les travaux
import { updateSessionStorage, getDpeRating } from "../utils/simulateur-utils";

interface Travaux {
  name: string;
  category: string;
  priority: number;
  price: number;
  score: number;
}

const ResultatsTravaux = () => {
  const [propositionSimple, setPropositionSimple] = useState<Travaux[]>([]);
  const [coutTotalSimple, setCoutTotalSimple] = useState<number>(0);
  const [propositionComplete, setPropositionComplete] = useState<Travaux[]>([]);
  const [coutTotalComplete, setCoutTotalComplete] = useState<number>(0);
  const [selectedProposition, setSelectedProposition] = useState<string | null>(null);
  const [noteDPE, setNoteDPE] = useState<string>(""); // Note DPE actuelle
  const [newNoteSimpleDPE, setNewNoteSimpleDPE] = useState<string>(""); // Nouvelle note DPE après travaux simples
  const [newNoteCompleteDPE, setNewNoteCompleteDPE] = useState<string>(""); // Nouvelle note DPE après travaux complets

  // Charger les données des travaux depuis le sessionStorage
  useEffect(() => {
    const logementData: any = sessionStorage.getItem("logementData");
    if (logementData) {
      const { travaux, scoreDPE, noteDPE } = JSON.parse(logementData);

      const travauxFiltres: Travaux[] = travauxData.filter((travauxItem: Travaux) => travaux.includes(travauxItem.name)).sort((a, b) => b.priority - a.priority);

      // Propositions de travaux
      if (travauxFiltres.length > 0) {
        setPropositionSimple([travauxFiltres[0]]);
        setCoutTotalSimple(travauxFiltres[0].price);

        const coutTotalTravaux = travauxFiltres.reduce((total, item) => total + item.price, 0);

        setCoutTotalComplete(coutTotalTravaux);
        setPropositionComplete(travauxFiltres);

        console.log(travauxFiltres[0]);
        console.log(travauxFiltres);

        let newScoreSimple = travauxFiltres[0].score;
        let newScoreComplete = travauxFiltres.reduce((total, item) => total + item.score, 0);

        const scoreOrigine = scoreDPE;

        // Calcul des nouveaux scores après travaux
        newScoreSimple = scoreOrigine + newScoreSimple;
        newScoreComplete = scoreOrigine + newScoreComplete;

        // Convertir les scores en notes DPE
        const simpleDpeRating = getDpeRating(newScoreSimple);
        const completeDpeRating = getDpeRating(newScoreComplete);

        // Mettre à jour les notes DPE dans l'état
        setNoteDPE(noteDPE); // Note DPE actuelle
        setNewNoteSimpleDPE(simpleDpeRating); // Nouvelle note après travaux simples
        setNewNoteCompleteDPE(completeDpeRating); // Nouvelle note après travaux complets
      }
    }
  }, []);

  useEffect(() => {
    const coutTravauxSelectionne = selectedProposition === "complete" ? coutTotalComplete : coutTotalSimple;
    updateSessionStorage("montant_travaux", coutTravauxSelectionne);
  }, [selectedProposition]);

  const handlePropositionSelect = (proposition: string) => {
    setSelectedProposition(proposition); // Met à jour l'état avec la proposition sélectionnée
  };

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-3xl font-bold text-center mb-8">Résultats du Simulateur de Travaux</h2>

      {/* Section Propositions de travaux */}
      <div className="flex gap-5 mb-4">
        {/* Proposition simple */}
        <div
          className={`col-md-6 p-6 border rounded-lg cursor-pointer transition-all duration-300 ${selectedProposition === "simple" ? "border-primary bg-secondary" : "border-gray-200 bg-white"}`}
          onClick={() => handlePropositionSelect("simple")}
        >
          <h4 className="text-lg font-bold">Proposition simple</h4>
          {propositionSimple.length > 0 ? (
            <>
              <ul className="list-disc list-inside">
                {propositionSimple.map((travaux) => (
                  <li key={travaux.name}>{travaux.name}</li>
                ))}
              </ul>
              <p>
                Note DPE actuel : <span className="font-bold">{noteDPE}</span> - Après travaux : <span className="font-bold">{newNoteSimpleDPE}</span>
              </p>
            </>
          ) : (
            <p>Aucun travaux simple disponible.</p>
          )}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Coût moyen des travaux</h3>
            {coutTotalSimple && (
              <>
                <p className="text-lg font-semibold">{coutTotalSimple} €</p>
                {/*  <p className="text-lg font-semibold">
                 {Math.round(coutTotalSimple * 0.8)} € - {Math.round(coutTotalSimple * 1.2)} €
               </p> */}
                <p>
                  Note DPE actuel : <span className="font-bold">{noteDPE}</span> - Après travaux : <span className="font-bold">{newNoteSimpleDPE}</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Proposition complète */}
        <div
          className={`col-md-6 p-6 border rounded-lg cursor-pointer transition-all duration-300 ${selectedProposition === "complete" ? "border-primary bg-secondary" : "border-gray-200 bg-white"}`}
          onClick={() => handlePropositionSelect("complete")}
        >
          <h4 className="text-lg font-bold">Proposition complète</h4>
          {propositionComplete.length > 0 ? (
            <ul className="list-disc list-inside">
              {propositionComplete.map((travaux) => (
                <li key={travaux.name}>{travaux.name}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun travaux complet disponible.</p>
          )}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Coût moyen des travaux</h3>
            {coutTotalComplete && (
              <>
                <p className="text-lg font-semibold">{coutTotalComplete} €</p>
                <p>
                  Note DPE actuel : <span className="font-bold">{noteDPE}</span> - Après travaux : <span className="font-bold">{newNoteCompleteDPE}</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Vous pouvez ajouter des actions basées sur la sélection */}
      {selectedProposition && (
        <div className="text-center mt-8">
          <a href="/simulateurs/financements" className="px-8 py-4 bg-primary text-white font-bold rounded-lg">
            Estimez vos aides
          </a>
        </div>
      )}
    </div>
  );
};

export default ResultatsTravaux;
