export const updateSessionStorage = (key: string, value: any) => {
  // Récupérer les données de sessionStorage pour "logementData"
  const logementData = JSON.parse(sessionStorage.getItem("logementData") || "{}");

  // Mettre à jour la clé avec la nouvelle valeur
  logementData[key] = value;

  // Sauvegarder les données mises à jour dans sessionStorage
  sessionStorage.setItem("logementData", JSON.stringify(logementData));
};
