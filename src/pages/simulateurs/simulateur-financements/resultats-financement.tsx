import { useEffect, useState } from "react";

const ResultatsTravaux = () => {
  const [data, setData] = useState([]);
  const [dureeEnMois, setDureeEnMois] = useState<number>(12); // Durée par défaut 12 mois
  const montantEmprunte = 20000; // Montant du prêt en euros
  const tauxAnnuel = 3; // Taux d'intérêt annuel en pourcentage

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
    params.append("logement.période+de+construction", `'${data.supplementaire.selectedYear.toLowerCase()}'`); // Période entourée de guillemets simples
    params.append("fields", "MPR.accompagnée.montant"); // Champs à récupérer

    const paramUrl = params.toString().replace(/ /g, "+").replace(/%2B/g, "+");
    console.log(paramUrl);
    // URL complète
    const url = `https://mesaidesreno.beta.gouv.fr/api/?${paramUrl}`;
    // Affichez l'URL
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result); // Affichez le résultat ou traitez-le comme vous le souhaitez
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch(url, {
        method: "POST", // Changement ici pour POST
        headers: {
          "Content-Type": "application/json", // Le type de contenu
        },
        body: params.toString().replace(/ /g, "+").replace(/%2B/g, "+"), // Ajoutez les paramètres dans le corps de la requête
      });

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

  function calculerMensualite(capital: number, tauxAnnuel: number, mois: number) {
    let tauxMensuel = tauxAnnuel / 12 / 100; // Convertir le taux annuel en taux mensuel
    let mensualite = (capital * tauxMensuel * Math.pow(1 + tauxMensuel, mois)) / (Math.pow(1 + tauxMensuel, mois) - 1);

    return mensualite;
  }

  const mensualite = calculerMensualite(montantEmprunte, tauxAnnuel, dureeEnMois);

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-3xl font-bold text-center mb-8">Résultats du Simulateur de Aides & Financement</h2>

      <div className="mt-8">
        <h1>Calculateur de prêt</h1>

        <p>Montant emprunté: {montantEmprunte} €</p>
        <p>Taux d'intérêt annuel: {tauxAnnuel} %</p>

        <div>
          <label htmlFor="duree">Sélectionnez la durée du prêt (mois): </label>
          <select id="duree" value={dureeEnMois} onChange={(e) => setDureeEnMois(parseInt(e.target.value))}>
            <option value={12}>12 mois (1 an)</option>
            <option value={24}>24 mois (2 ans)</option>
            <option value={36}>36 mois (3 ans)</option>
            <option value={48}>48 mois (4 ans)</option>
            <option value={60}>60 mois (5 ans)</option>
            <option value={72}>72 mois (6 ans)</option>
            <option value={84}>84 mois (7 ans)</option>
          </select>
        </div>

        <h2>Résultat</h2>
        <p>Durée du prêt: {dureeEnMois} mois</p>
        <p>Mensualité: {mensualite.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default ResultatsTravaux;
