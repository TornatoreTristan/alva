// @ts-nocheck
import data from "../data/items-dpe.json";

export const calculateDpeScore = (logementData: any): number => {
  let score = data.initialScore;

  // 1. Type de logement et année de construction
  if (logementData?.logement?.selectedType === "maison") {
    score -= data.typeDeLogement.maison;
  }
  if (logementData?.logement?.selectedYear) {
    score -= data.anneeConstruction[logementData?.logement?.selectedYear] || 0;
  }

  // 2. Isolation des murs, toit, fenêtres et sous-sol
  if (logementData?.isolation) {
    for (const key in data.isolationScores) {
      if (logementData.isolation[key]) {
        const isolationAge = logementData.isolation[key];
        const reductionFactor = data.isolationReduction[isolationAge] || 0;
        score -= data.isolationScores[key] * reductionFactor;
      }
    }
  }

  // 3. Vitrage et nombre de fenêtres
  if (logementData?.isolation?.vitrage) {
    score -= data.vitrage[logementData.isolation.vitrage] || 0;
  }

  // 4. Chauffage : type d'énergie et efficacité
  if (logementData?.equipements?.chauffageEnergie) {
    score -= data.chauffage[logementData.equipements.chauffageEnergie] || 0;
  }

  // 5. Eau chaude : type d'énergie
  if (logementData?.equipements?.eauChaudeEnergie) {
    score -= data.eauChaude[logementData.equipements.eauChaudeEnergie] || 0;
  }

  // 6. Ventilation et climatisation
  if (logementData?.ventilation?.ventilationType) {
    score -= data.ventilation[logementData.ventilation.ventilationType] || 0;
  }
  if (logementData?.ventilation?.climatisation === "Non") {
    score -= data.ventilation.climatisation;
  }

  return Math.max(0, Math.min(100, score));
};

export const getDpeRating = (score: number): string => {
  for (const rating in data.scoreRange) {
    if (score >= data.scoreRange[rating]) {
      return rating;
    }
  }
  return "G";
};

export const updateSessionStorage = (key: string, value: any) => {
  const logementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");
  logementData[key] = value;
  sessionStorage.setItem("logementData", JSON.stringify(logementData));
};

export const updateSessionStorageValue = (key: string, keyValue: string, value: any) => {
  const logementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");
  if (!logementData[key]) {
    return false;
  }
  logementData[key][keyValue] = value;
  sessionStorage.setItem("logementData", JSON.stringify(logementData));
};
