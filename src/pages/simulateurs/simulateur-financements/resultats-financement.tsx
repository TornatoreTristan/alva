import { useEffect, useState } from "react";

const ResultatsTravaux = () => {
  const [data, setData] = useState([]);

  // Charger les données des travaux depuis le sessionStorage
  useEffect(() => {
    const logementData: any = sessionStorage.getItem("logementData");
    if (logementData) {
      const allData = JSON.parse(logementData);
      setData(allData);

      console.log(allData);
      console.log(convertDPEToNumber(allData.noteDPE));
    }
  }, []);

  const convertDPEToNumber = (dpe) => {
    // Tableau de correspondance entre les lettres DPE et leurs valeurs
    const dpeMapping = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
    };

    // Vérifiez si la lettre est valide et renvoyez sa valeur
    // const upperDPE = dpe.toUpperCase(); // Assurez-vous que la lettre est en majuscule
    return dpeMapping[dpe] || null; // Retourne null si la lettre n'est pas valide
  };

  const fetchData = async () => {
    // Vérifiez que les données sont complètes
    if (!data || !data.situation || !data.supplementaire || !data.logement) {
      console.error("Les données sont manquantes ou incomplètes.");
      return;
    }

    // Créer les paramètres d'URL avec URLSearchParams
    const params = new URLSearchParams();

    params.append("vous.propriétaire.condition", data.situation.isOwner.toLowerCase());
    params.append("ménage.personnes", data.situation.nbrOccupant);
    params.append("ménage.revenu", parseInt(data.situation.revenue.replace(/\D/g, "")) || 0);
    params.append("DPE.actuel", convertDPEToNumber(data.noteDPE));
    params.append("projet.DPE+visé", convertDPEToNumber(data.supplementaire.selectedNewNoteDPE));
    params.append("projet.travaux", parseInt(data.supplementaire.priceWork.replace(/\D/g, "")) || 0);
    params.append("ménage.commune", `'${data.logement.postalCode}'`); // Code postal entouré de guillemets simples
    params.append("logement.propriétaire+occupant", data.situation.isOccupant.toLowerCase());
    params.append("logement.résidence+principale+propriétaire", data.situation.isOwner.toLowerCase());
    params.append("logement.période+de+construction", `'${data.supplementaire.selectedYear}'`); // Période entourée de guillemets simples
    params.append("fields", "MPR.accompagnée.montant"); // Champs à récupérer

    const paramUrl = params.toString().replace(/ /g, "+").replace(/%2B/g, "+");
    console.log(paramUrl);
    // URL complète
    const url = `https://mesaidesreno.beta.gouv.fr/api/?${paramUrl}`;
    // Affichez l'URL
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result); // Affichez le résultat ou traitez-le comme vous le souhaitez
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Appelez la fonction pour exécuter la requête
  fetchData();

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-3xl font-bold text-center mb-8">Résultats du Simulateur de Aides & Financement</h2>
    </div>
  );
};

export default ResultatsTravaux;
