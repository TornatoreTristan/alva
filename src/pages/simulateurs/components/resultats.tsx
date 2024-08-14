import { useEffect, useState } from 'react';

const Resultats = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const logementData = JSON.parse(sessionStorage.getItem('logementData') || '{}');
    const configurationData = JSON.parse(sessionStorage.getItem('configurationData') || '{}');
    const isolationData = JSON.parse(sessionStorage.getItem('isolationData') || '{}');
    const equipementsData = JSON.parse(sessionStorage.getItem('equipementsData') || '{}');
    const ventilationData = JSON.parse(sessionStorage.getItem('ventilationData') || '{}');
    const informationsData = JSON.parse(sessionStorage.getItem('informationsData') || '{}');
    const maisonData = JSON.parse(sessionStorage.getItem('maisonData') || '{}');
    const appartementData = JSON.parse(sessionStorage.getItem('appartementData') || '{}');

    setData({
      logement: logementData,
      configuration: configurationData,
      isolation: isolationData,
      equipements: equipementsData,
      ventilation: ventilationData,
      informations: informationsData,
      maison: maisonData,
      appartement: appartementData,
    });
  }, []);

  const calculateDpeScore = () => {
    let score = 0;

    // Logique de calcul (exemple simple)
    if (data.logement?.selectedType) score += 10;
    if (data.configuration?.selectedShape) score += 20;
    if (data.isolation?.murIsolation) score += 15;
    if (data.equipements?.selectedHeatingType) score += 25;
    if (data.ventilation?.climatisation) score += 10;
    if (data.informations?.motif) score += 5;

    return score;
  };

  const dpeScore = calculateDpeScore();

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-2xl font-bold text-center mb-8">Résultats de votre DPE</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Résumé des informations</h3>
        <p><strong>Type de logement :</strong> {data.logement?.selectedType}</p>
        {data.logement?.selectedType === 'maison' ? (
          <>
            <p><strong>Forme de la maison :</strong> {data.maison?.shape}</p>
            <p><strong>Mitoyenneté :</strong> {data.maison?.adjacency}</p>
            <p><strong>Nombre d'étages :</strong> {data.maison?.floors}</p>
            <p><strong>Surface habitable :</strong> {data.maison?.surface} m²</p>
          </>
        ) : (
          <>
            <p><strong>Emplacement de l'appartement :</strong> {data.appartement?.emplacement}</p>
            <p><strong>Type d'appartement :</strong> {data.appartement?.type}</p>
            <p><strong>Nombre de façades :</strong> {data.appartement?.facades}</p>
          </>
        )}
        <p><strong>Énergie pour le chauffage :</strong> {data.equipements?.selectedHeatingEnergy}</p>
        <p><strong>Énergie pour l'eau chaude :</strong> {data.equipements?.selectedHotWaterEnergy}</p>
        <p><strong>Climatisation :</strong> {data.ventilation?.climatisation ? 'Oui' : 'Non'}</p>
        <p><strong>Type de ventilation :</strong> {data.ventilation?.ventilationType}</p>
        <p><strong>Motif de simulation :</strong> {data.informations?.motif}</p>
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold mb-4">Votre score DPE estimé est : {dpeScore}</p>
        <p className="text-gray-700">Ce score est une estimation basée sur les informations fournies.</p>
      </div>
    </div>
  );
};

export default Resultats;
