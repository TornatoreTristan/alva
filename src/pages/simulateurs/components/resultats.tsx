import { useEffect, useState } from "react";

const Resultats = () => {
  const [logementData, setLogementData] = useState<any>({});
  const [noteDPE, setNoteDEP] = useState("");

  // Charger logementData depuis sessionStorage
  useEffect(() => {
    const storedLogementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");
    setLogementData(storedLogementData);

    const dpeScoreNumber = calculateDpeScore();
    setNoteDEP(getDpeRating(dpeScoreNumber));
  }, []);

  const calculateDpeScore = () => {
    let score = 100; // Partons d'un score maximum de 100 (un logement très performant)

    // 1. Type de logement et année de construction
    if (logementData?.logement?.selectedType === "maison") {
      score -= 5; // Les maisons sont généralement moins efficientes que les appartements
    }
    if (logementData?.logement?.selectedYear) {
      switch (logementData?.logement?.selectedYear) {
        case "Avant 1948":
          score -= 20; // Très peu isolées
          break;
        case "Entre 1950 et 1997":
          score -= 15; // Isolation modérée
          break;
        case "Entre 1998 et 2012":
          score -= 10; // Amélioration des normes d'isolation
          break;
        case "Après 2012":
          score -= 5; // Logements plus récents et mieux isolés
          break;
      }
    }

    // 2. Isolation des murs, toit, fenêtres et sous-sol
    const isolationScores = {
      murIsolation: 15,
      toiture: 10,
      combles: 10,
      sousSol: 5,
    };

    if (logementData?.isolation) {
      for (const key in isolationScores) {
        if (logementData.isolation[key]) {
          switch (logementData.isolation[key]) {
            case "+ de 10 ans":
              score -= isolationScores[key]; // Moins performant
              break;
            case "- de 10 ans":
              score -= isolationScores[key] / 2; // Modérément performant
              break;
          }
        }
      }
    }

    // 3. Vitrage et nombre de fenêtres
    if (logementData?.isolation?.vitrage === "Double") {
      score -= 5;
    } else if (logementData?.isolation?.vitrage === "Triple") {
      score -= 2;
    } else {
      score -= 10;
    }

    // 4. Chauffage : type d'énergie et efficacité
    if (logementData?.chauffageEnergie) {
      switch (logementData.chauffageEnergie) {
        case "Électricité":
          score -= 20; // Énergie moins efficiente et plus chère
          break;
        case "Gaz":
          score -= 15;
          break;
        case "Fioul":
          score -= 25; // Très inefficace et polluant
          break;
        case "Pompe à chaleur":
          score -= 5; // Très efficiente
          break;
        case "Bois":
          score -= 10; // Relativement propre mais moins efficient
          break;
      }
    }

    // 5. Eau chaude : type d'énergie
    if (logementData?.eauChaudeEnergie) {
      switch (logementData.eauChaudeEnergie) {
        case "Électricité":
          score -= 10;
          break;
        case "Gaz":
          score -= 7;
          break;
        case "Fioul":
          score -= 15;
          break;
        case "Pompe à chaleur":
          score -= 5; // Très efficiente
          break;
        case "Chauffe-eau thermodynamique":
          score -= 3; // Très performant
          break;
      }
    }

    // 6. Ventilation et climatisation
    if (logementData?.ventilation?.ventilationType) {
      switch (logementData.ventilation.ventilationType) {
        case "VMC simple flux":
          score -= 5; // Moins performant
          break;
        case "VMC double flux":
          score -= 2; // Plus performant
          break;
        case "Ventilation naturelle":
          score -= 10; // Plus performant
          break;
      }
    }

    if (logementData?.ventilation?.climatisation === "Non") {
      score -= 10; //
    }

    console.log(score);
    console.log(Math.max(0, Math.min(100, score)));
    // Retourner un score compris entre 0 et 100
    return Math.max(0, Math.min(100, score)); // Le score est limité à cette plage
  };

  const getDpeRating = (score: number) => {
    // Convertir le score en note DPE
    if (score >= 80) {
      return "A"; // Très performant
    } else if (score >= 70) {
      return "B"; // Performant
    } else if (score >= 60) {
      return "C"; // Moyennement performant
    } else if (score >= 50) {
      return "D"; // Moyennement performant
    } else if (score >= 40) {
      return "E"; // Passable
    } else if (score >= 30) {
      return "F"; // Insuffisant
    } else {
      return "G"; // Très insuffisant
    }
  };

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
    </div>
  );
};

export default Resultats;
