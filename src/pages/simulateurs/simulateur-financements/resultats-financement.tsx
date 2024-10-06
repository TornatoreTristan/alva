import { useEffect, useState } from "react";

const ResultatsTravaux = () => {
  const [data, setData] = useState<any>([]);
  const [dureeEnMois, setDureeEnMois] = useState<number>(84); // Durée par défaut 12 mois
  const [aideMontant, setAideMontant] = useState<number>(0);
  const [montantEmprunte, setMontantEmprunte] = useState<number>(0);
  const [mensualite, setMensualite] = useState<number>(0);
  const [coutFinal, setCoutFinal] = useState<number>(0);
  const tauxAnnuel = 3; // Taux d'intérêt annuel en pourcentage

  // Charger les données des travaux depuis le sessionStorage
  useEffect(() => {
    const logementData: any = sessionStorage.getItem("logementData");
    if (logementData) {
      const allData = JSON.parse(logementData);
      setData(allData);
      setMontantEmprunte(parseInt(allData?.montant_travaux) ?? 0);
      // console.log(allData);
      // console.log(convertDPEToNumber(allData.noteDPE));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [data]);

  useEffect(() => {
    setMensualite(calculerMensualite(coutFinal, tauxAnnuel, dureeEnMois));
  }, [coutFinal, data, dureeEnMois]);

  useEffect(() => {
    setCoutFinal(parseInt(data?.montant_travaux) - (aideMontant || 0));
  }, [aideMontant, montantEmprunte]);

  const convertDPEToNumber = (dpe: string) => {
    const dpeMapping: any = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
    };
    const upperDPE = dpe.toUpperCase();
    return dpeMapping[dpe] || null;
  };

  const fetchData = async () => {
    console.log(data);
    // // Vérifiez que les données sont complètes
    if (!data || !data.situation || !data.supplementaire || !data.logement || !data.montant_travaux || !data.noteDPENew || !data.noteDPE) {
      console.error("Les données sont manquantes ou incomplètes.");
      return false;
    }

    // Créer les paramètres d'URL avec URLSearchParams
    const params = new URLSearchParams();

    params.append("vous.propriétaire.condition", data.situation.isOwner.toLowerCase());
    params.append("ménage.personnes", data.situation.nbrOccupant);
    params.append("ménage.revenu", (parseInt(data.situation.revenue.replace(/\D/g, "")) || 0).toString());
    params.append("DPE.actuel", convertDPEToNumber(data.noteDPE));
    params.append("projet.DPE+visé", convertDPEToNumber(data.noteDPENew));
    params.append("projet.travaux", (parseInt(data.montant_travaux) || 0).toString());
    params.append("ménage.commune", `'${data.logement.postalCode}'`);
    params.append("logement.propriétaire+occupant", data.situation.isOccupant.toLowerCase());

    if (data.situation.isOccupant.toLowerCase() === "non") {
      params.append("logement.résidence+principale+locataire", data.situation.isOwnerForLocataire.toLowerCase());
    } else {
      params.append("logement.résidence+principale+propriétaire", data.situation.isOwner.toLowerCase());
    }

    params.append("logement.période+de+construction", `'${data.supplementaire.selectedYear.toLowerCase()}'`);
    params.append("fields", "MPR.accompagnée.montant");

    const paramUrl = params.toString().replace(/ /g, "+").replace(/%2B/g, "+");
    // console.log(paramUrl);

    const url = `https://mesaidesreno.beta.gouv.fr/api/?${paramUrl}`;
    console.log(url);

    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setAideMontant(parseInt(result["MPR.accompagnée.montant"].rawValue) ?? 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function calculerMensualite(capital: number, tauxAnnuel: number, mois: number) {
    let tauxMensuel = tauxAnnuel / 12 / 100; // Convertir le taux annuel en taux mensuel
    let mensualite = (capital * tauxMensuel * Math.pow(1 + tauxMensuel, mois)) / (Math.pow(1 + tauxMensuel, mois) - 1);

    return mensualite;
  }

  // Formatage des montants en euros avec l'espace insécable
  const formatEuro = (montant: number) => {
    return montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  };

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-3xl font-bold text-center mb-8">Résultats du Simulateur de Aides & Financement</h2>

      <div className="mt-8">
        <h2>Résumé des travaux</h2>
        <p>
          <strong>Montant des travaux :</strong> {formatEuro(montantEmprunte)}
        </p>
        <p>
          <strong>Montant des aides :</strong> {formatEuro(aideMontant)}
        </p>
        <hr />
        <p>
          <strong>Coût total après aides :</strong> {formatEuro(coutFinal)}
        </p>
      </div>

      <div className="mt-8">
        <h1>Calculateur de prêt</h1>

        <p>Montant emprunté: {coutFinal} €</p>
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
