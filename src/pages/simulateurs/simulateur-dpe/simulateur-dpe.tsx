// @ts-nocheck
import { useState } from "react";
import { HiOutlineCheck } from "react-icons/hi2";

import Logement from "../components/logement";
import Isolation from "../components/isolation";
import Equipements from "../components/equipements";
import Informations from "../components/informations";
import Configuration from "../components/configuration";
import Ventilation from "../components/ventilation";
import Travaux from "../components/travaux";
import NoteDPE from "../components/noteDPE";
import Resultats from "./resultats-dpe";

const SimulateurDPE = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Tableau des labels
  const labels = ["Logement", "Configuration", "Isolation", "Équipements", "Ventilation", "Informations", "Résultats"];

  // Tableau des composants avec les étapes automatiques
  const components = [
    <Logement nextStep={() => setCurrentStepIndex((prev) => prev + 1)} />,
    <Configuration nextStep={() => setCurrentStepIndex((prev) => prev + 1)} />,
    <Isolation nextStep={() => setCurrentStepIndex((prev) => prev + 1)} />,
    <Equipements nextStep={() => setCurrentStepIndex((prev) => prev + 1)} />,
    <Ventilation nextStep={() => setCurrentStepIndex((prev) => prev + 1)} />,
    <Informations nextStep={() => setCurrentStepIndex((prev) => prev + 1)} btn="Obtenir ma note DPE" />,
    <Resultats />,
  ];

  // Fonction pour rendre le composant de l'étape actuelle
  const renderCurrentStep = () => {
    return components[currentStepIndex];
  };

  // Fonction pour générer la liste des étapes dans la barre latérale
  const renderStepList = () => {
    return labels.map((label, index) => (
      <div key={index} onClick={() => setCurrentStepIndex(index)}>
        <h3 className={`text-lg cursor-pointer ${currentStepIndex === index ? "font-bold" : "opacity-30"}`}>{label}</h3>
      </div>
    ));
  };

  return (
    <main className="flex min-h-[70vh] gap-12 px-12 my-8">
      <section className="w-1/3">
        <h2 className="text-2xl">Votre simulation</h2>
        <hr />
        <div>{renderStepList()}</div> {/* Liste des étapes cliquables */}
      </section>

      <section className="px-12">
        <div className="w-full">
          <h1>Obtenez une estimation de la note de votre DPE</h1>
          <div className="flex items-center gap-3 my-4">
            <p className="flex items-center px-4 py-2 rounded bg-primary text-secondary stroke-secondary gap-2 font-bold">
              <HiOutlineCheck className="stroke-secondary" /> Gratuit
            </p>
            <p className="flex items-center px-4 py-2 rounded bg-primary text-secondary stroke-secondary gap-2 font-bold">
              <HiOutlineCheck className="stroke-secondary" /> 3 minutes
            </p>
            <p className="flex items-center px-4 py-2 rounded bg-primary text-secondary stroke-secondary gap-2 font-bold">
              <HiOutlineCheck className="stroke-secondary" /> Un bilan complet
            </p>
          </div>
          <div>{renderCurrentStep()}</div> {/* Rendu du composant de l'étape actuelle */}
          <p>
            Avec ce simulateur, vous obtiendrez une estimation de l'étiquette énergétique de votre logement. Cette simulation se base sur une méthode adaptée du 3CL de l'ADEME.
            <span className="font-bold">
              {" "}
              Attention, la note obtenue ne se substitue pas à un DPE certifié. Seul un professionnel certifié par l'ADEME est en mesure de vous fournir la note officielle de votre logement.
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SimulateurDPE;
