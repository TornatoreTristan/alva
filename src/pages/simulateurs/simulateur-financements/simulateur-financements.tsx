// @ts-nocheck
import { useState, useEffect } from "react";
import { HiOutlineCheck } from "react-icons/hi2";
// import Logement from "./logement";
// import Isolation from "./isolation";
// import Equipements from "./equipements";
// import Informations from "./informations";
// import Configuration from "./configuration";
// import Ventilation from "./ventilation";
// import Resultats from './resultats';

const SimulateurFinancements = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        nom: "",
        adresse: "",
        revenuFiscal: "",
        typeTravaux: "",
        typeLogement: "",
        surfaceLogement: "",
        anneeConstruction: "",
        nombreOccupants: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Remplacer par l'appel à l'API d'aide de l'état
        console.log("Données soumises : ", formData);
        // Appel à une API ici avec fetch ou axios pour soumettre les données
    };

    // const [formData, setFormData] = useState(() => {
    //   const savedData = sessionStorage.getItem('formData');
    //   return savedData ? JSON.parse(savedData) : {
    //     logement: {} as any,
    //     configuration: {} as any,
    //     isolation: {} as any,
    //     equipements: {} as any,
    //     ventilation: {} as any,
    //     informations: {} as any
    //   };
    // });

    // useEffect(() => {
    //   sessionStorage.setItem('formData', JSON.stringify(formData));
    // }, [formData]);

    // const updateFormData = (step: string, data: any) => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [step]: data
    //   }));
    // };

    // const renderStep = () => {
    //   switch (currentStep) {
    //     case 1:
    //       return <Logement data={formData.logement} updateData={(data: any) => updateFormData('logement', data)} nextStep={() => setCurrentStep(2)} />;
    //     case 2:
    //       return <Configuration data={formData.configuration} updateData={(data: any) => updateFormData('configuration', data)} nextStep={() => setCurrentStep(3)} />;
    //     case 3:
    //       return <Isolation data={formData.isolation} updateData={(data: any) => updateFormData('isolation', data)} nextStep={() => setCurrentStep(4)} />;
    //     case 4:
    //       return <Equipements data={formData.equipements} updateData={(data: any) => updateFormData('equipements', data)} nextStep={() => setCurrentStep(5)} />;
    //     case 5:
    //       return <Ventilation data={formData.ventilation} updateData={(data: any) => updateFormData('ventilation', data)} nextStep={() => setCurrentStep(6)} />;
    //     case 6:
    //       return <Informations data={formData.informations} updateData={(data: any) => updateFormData('informations', data)} nextStep={() => setCurrentStep(7)} />;
    //     case 7:
    //       return <Resultats formData={formData} />;
    //     default:
    //       return <Logement data={formData.logement} updateData={(data: any) => updateFormData('logement', data)} nextStep={() => setCurrentStep(2)} />;
    //   }
    // };

    const sendApplication = async () => {
        const data = {
            vous: {
                proprietaire: true,
            },
            menage: {
                personnes: 3,
                revenu: 25000,
                commune: "25388",
            },
            DPE: {
                actuel: 6,
            },
            projet: {
                DPE_vise: 2,
                travaux: 50000,
            },
            logement: {
                proprietaire_occupant: true,
                residence_principale_proprietaire: true,
                periode_construction: "de 15 à 25 ans",
            },
        };

        try {
            const response = await fetch("https://mesaidesreno.beta.gouv.fr/api/?fields=MPR.accompagn%C3%A9e.montant", {
                method: "POST", // Méthode de la requête
                headers: {
                    "Content-Type": "application/json", // Spécifie que le corps est au format JSON
                },
                body: JSON.stringify(data), // Convertit l'objet JavaScript en chaîne JSON
            });

            // Vérifie si la réponse est correcte (status 200-299)
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const responseData = await response.json(); // Parse la réponse JSON
            console.log("Réponse:", responseData);
        } catch (error) {
            console.error("Erreur lors de l'envoi de la demande:", error);
        }
    };

    // // Appel de la fonction pour envoyer la requête
    sendApplication();

    const fetchApplicationData = async () => {
        const baseUrl = "https://mesaidesreno.beta.gouv.fr/api/?vous.propri%C3%A9taire.condition=oui&m%C3%A9nage.personnes=3&m%C3%A9nage.revenu=25000&DPE.actuel=6&projet.DPE+vis%C3%A9=2&projet.travaux=50000&m%C3%A9nage.commune=%2725388%27&logement.propri%C3%A9taire+occupant=oui&logement.r%C3%A9sidence+principale+propri%C3%A9taire=oui&logement.p%C3%A9riode+de+construction=%27de+15+%C3%A0+25+ans%27&fields=MPR.accompagn%C3%A9e.montant";
        const params = new URLSearchParams({
            "vous.propriétaire.condition": "oui",
            "ménage.personnes": 3,
            "ménage.revenu": 25000,
            "DPE.actuel": 6,
            "projet.DPE visé": 2,
            "projet.travaux": 50000,
            "ménage.commune": "'25388'",
            "logement.propriétaire occupant": "oui",
            "logement.résidence principale propriétaire": "oui",
            "logement.période de construction": "'de 15 à 25 ans'",
            fields: "MPR.accompagnée.montant",
        });

        try {
            // const response = await fetch(`${baseUrl}?${params.toString()}`, {
            const response = await fetch(`${baseUrl}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Vérifie si la réponse est correcte (status 200-299)
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const responseData = await response.json(); // Parse la réponse JSON
            console.log("Réponse:", responseData);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    // Appel de la fonction pour envoyer la requête
    fetchApplicationData();

    return (
        <main className="flex min-h-[70vh] gap-12 px-12 my-8">
            <section className="w-1/3">
                <h2 className="text-2xl">Votre simulation</h2>
                <hr />
                <div>
                    <div onClick={() => setCurrentStep(1)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 1 ? "font-bold" : "opacity-30"}`}>Logement</h3>
                    </div>
                    <div onClick={() => setCurrentStep(2)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 2 ? "font-bold" : "opacity-30"}`}> configuration du bien</h3>
                    </div>
                    <div onClick={() => setCurrentStep(3)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 3 ? "font-bold" : "opacity-30"}`}>Isolation</h3>
                    </div>
                    <div onClick={() => setCurrentStep(4)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 4 ? "font-bold" : "opacity-30"}`}> Équipements</h3>
                    </div>
                    <div onClick={() => setCurrentStep(5)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 5 ? "font-bold" : "opacity-30"}`}> Ventilation</h3>
                    </div>
                    <div onClick={() => setCurrentStep(6)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 6 ? "font-bold" : "opacity-30"}`}> Informations</h3>
                    </div>
                </div>
            </section>
            <section className="px-12">
                <div className="w-full">
                    <h1>Obtenez une estimations du montant de vos aides & financements</h1>
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
                    <div>
                        {/* {renderStep()} */}
                        <form onSubmit={handleSubmit} className="aides-travaux-form">
                            <div>
                                <label>Nom:</label>
                                <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                            </div>

                            <div>
                                <label>Adresse:</label>
                                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required />
                            </div>

                            <div>
                                <label>Revenu fiscal de référence:</label>
                                <input type="number" name="revenuFiscal" value={formData.revenuFiscal} onChange={handleChange} required />
                            </div>

                            <div>
                                <label>Type de travaux:</label>
                                <select name="typeTravaux" value={formData.typeTravaux} onChange={handleChange} required>
                                    <option value="">-- Sélectionner --</option>
                                    <option value="Isolation">Isolation</option>
                                    <option value="Chauffage">Chauffage</option>
                                    <option value="Ventilation">Ventilation</option>
                                    <option value="Fenêtres">Fenêtres</option>
                                </select>
                            </div>

                            <div>
                                <label>Type de logement:</label>
                                <select name="typeLogement" value={formData.typeLogement} onChange={handleChange} required>
                                    <option value="">-- Sélectionner --</option>
                                    <option value="Appartement">Appartement</option>
                                    <option value="Maison">Maison</option>
                                </select>
                            </div>

                            <div>
                                <label>Surface du logement (m²):</label>
                                <input type="number" name="surfaceLogement" value={formData.surfaceLogement} onChange={handleChange} required />
                            </div>

                            <div>
                                <label>Année de construction:</label>
                                <input type="number" name="anneeConstruction" value={formData.anneeConstruction} onChange={handleChange} required />
                            </div>

                            <div>
                                <label>Nombre d'occupants:</label>
                                <input type="number" name="nombreOccupants" value={formData.nombreOccupants} onChange={handleChange} required />
                            </div>

                            <button type="submit">Soumettre</button>
                        </form>
                    </div>
                    <p>
                        Avec ce simulateur, vous obtiendrez une estimation des aides et financements disponibles pour améliorer la performance énergétique de votre logement.<span className="font-bold"> Attention, les résultats obtenus ne remplacent pas une consultation auprès d'un conseiller spécialisé. Seul un professionnel certifié est en mesure de vous fournir des informations précises et adaptées à votre situation.</span>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SimulateurFinancements;
