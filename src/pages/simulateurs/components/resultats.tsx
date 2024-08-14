const Resultats = ({ formData }: any) => {
  const { logement, configuration, isolation, equipements, ventilation, informations } = formData;

  // Exemple de calcul basé sur les informations collectées
  const calculateDpeScore = () => {
    let score = 0;

    // Logique de calcul
    if (logement.selectedType) score += 10;
    if (configuration.selectedShape) score += 20;
    if (isolation.murIsolation) score += 15;
    if (equipements.heating) score += 25;
    if (informations.motif) score += 5;

    return score;
  };

  const dpeScore = calculateDpeScore();

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h2 className="text-2xl font-bold text-center mb-8">Résultats de votre DPE</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Résumé des informations</h3>
        <p><strong>Type de logement :</strong> {logement.selectedType}</p>
        <p><strong>Forme de la maison :</strong> {configuration.selectedShape}</p>
        <p><strong>Isolation des murs :</strong> {isolation.murIsolation}</p>
        <p><strong>Énergie utilisée pour le chauffage :</strong> {equipements.heating}</p>
        <p><strong>Motif de simulation :</strong> {informations.motif}</p>
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold mb-4">Votre score DPE estimé est : {dpeScore}</p>
        <p className="text-gray-700">Ce score est une estimation basée sur les informations fournies.</p>
      </div>
    </div>
  );
};

export default Resultats;
