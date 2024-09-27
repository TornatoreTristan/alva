import { useEffect, useState } from "react";
import { updateSessionStorage, calculateDpeScore, getDpeRating } from "../utils/simulateur-utils";

const Resultats = () => {
  const [logementData, setLogementData] = useState<any>({});
  const [noteDPE, setNoteDEP] = useState("");
  const [score, setScore] = useState(0);

  // Charger logementData depuis sessionStorage
  useEffect(() => {
    const storedLogementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");
    setLogementData(storedLogementData);
  }, []);

  useEffect(() => {
    const dpeScoreNumber = calculateDpeScore(logementData);
    setScore(dpeScoreNumber);
    setNoteDEP(getDpeRating(dpeScoreNumber));
  }, [logementData]);

  useEffect(() => {
    updateSessionStorage("noteDPE", noteDPE);
    updateSessionStorage("scoreDPE", score);
  }, [noteDPE]);

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-2xl font-bold text-center mb-8">Résultats de votre DPE</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Résumé des informations</h3>

        {/* Informations générales sur le logement */}
        <p>
          <strong>Type de logement :</strong> {logementData?.logement?.selectedType}
        </p>
        <p>
          <strong>Code postal :</strong> {logementData?.logement?.postalCode}
        </p>
        <p>
          <strong>Année de construction :</strong> {logementData?.logement?.selectedYear}
        </p>

        {/* Affichage des informations spécifiques selon le type de logement */}
        {logementData?.logement?.selectedType === "maison" ? (
          <>
            <p>
              <strong>Forme de la maison :</strong> {logementData?.maison?.shape}
            </p>
            <p>
              <strong>Mitoyenneté :</strong> {logementData?.maison?.adjacency}
            </p>
            <p>
              <strong>Nombre d'étages :</strong> {logementData?.maison?.floors}
            </p>
            <p>
              <strong>Surface habitable :</strong> {logementData?.maison?.surface} m²
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Emplacement de l'appartement :</strong> {logementData?.appartement?.emplacement}
            </p>
            <p>
              <strong>Type d'appartement :</strong> {logementData?.appartement?.type}
            </p>
            <p>
              <strong>Nombre de façades :</strong> {logementData?.appartement?.facades}
            </p>
          </>
        )}

        {/* Informations sur l'isolation */}
        <h4 className="text-lg font-bold mt-4">Isolation</h4>
        <p>
          <strong>Isolation des murs :</strong> {logementData?.isolation?.murIsolation}
        </p>
        <p>
          <strong>Type de toiture :</strong> {logementData?.isolation?.toiture}
        </p>
        <p>
          <strong>Isolation des combles :</strong> {logementData?.isolation?.combles}
        </p>
        <p>
          <strong>Type de sous-sol :</strong> {logementData?.isolation?.sousSol}
        </p>
        <p>
          <strong>Nombre de façades isolées :</strong> {logementData?.isolation?.facades}
        </p>
        <p>
          <strong>Nombre de fenêtres :</strong> {logementData?.isolation?.fenetres}
        </p>
        <p>
          <strong>Type de vitrage :</strong> {logementData?.isolation?.vitrage}
        </p>

        {/* Informations sur les équipements */}
        <h4 className="text-lg font-bold mt-4">Équipements</h4>
        <p>
          <strong>Énergie pour le chauffage :</strong> {logementData?.equipements?.chauffageEnergie}
        </p>
        <p>
          <strong>Énergie pour l'eau chaude :</strong> {logementData?.equipements?.eauChaudeEnergie}
        </p>

        {/* Informations sur la ventilation */}
        <h4 className="text-lg font-bold mt-4">Ventilation</h4>
        <p>
          <strong>Climatisation :</strong> {logementData?.ventilation?.climatisation ? "Oui" : "Non"}
        </p>
        <p>
          <strong>Type de ventilation :</strong> {logementData?.ventilation?.ventilationType}
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold mb-4">Votre score DPE estimé est : {noteDPE}</p>
        <p className="text-gray-700">Ce score est une estimation basée sur les informations fournies.</p>
      </div>

      {noteDPE && (
        <div className="text-center mt-8">
          <a href="/simulateurs/bilan-travaux" className="px-8 py-4 bg-primary text-white font-bold rounded-lg">
            Estimez vos travaux
          </a>
        </div>
      )}
    </div>
  );
};

export default Resultats;
