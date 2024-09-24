// @ts-nocheck
import { useState, useEffect } from "react";
import { HiOutlineCheck } from "react-icons/hi2";

import Logement from "../components/logement";
import Isolation from "../components/isolation";
import Equipements from "../components/equipements";
import Informations from "../components/informations";
import Configuration from "../components/configuration";
import Ventilation from "../components/ventilation";
import Travaux from "../components/travaux";
import NoteDPE from "../components/noteDPE";

const SimulateurTravaux = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const savedData = sessionStorage.getItem("formData");
        return savedData
            ? JSON.parse(savedData)
            : {
                  logement: {} as any,
                  configuration: {} as any,
                  isolation: {} as any,
                  equipements: {} as any,
                  ventilation: {} as any,
                  noteDPE: {} as any,
                  travaux: {} as any,
                  informations: {} as any,
              };
    });

    console.log(formData);

    useEffect(() => {
        sessionStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const updateFormData = (step: string, data: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [step]: data,
        }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Logement data={formData.logement} updateData={(data: any) => updateFormData("logement", data)} nextStep={() => setCurrentStep(2)} />;
            case 2:
                return <Configuration data={formData.configuration} updateData={(data: any) => updateFormData("configuration", data)} nextStep={() => setCurrentStep(3)} />;
            case 3:
                return <Isolation data={formData.isolation} updateData={(data: any) => updateFormData("isolation", data)} nextStep={() => setCurrentStep(4)} />;
            case 4:
                return <Equipements data={formData.equipements} updateData={(data: any) => updateFormData("equipements", data)} nextStep={() => setCurrentStep(5)} />;
            case 5:
                return <Ventilation data={formData.ventilation} updateData={(data: any) => updateFormData("ventilation", data)} nextStep={() => setCurrentStep(6)} />;
            case 6:
                return <NoteDPE data={formData.noteDPE} updateData={(data: any) => updateFormData("noteDPE", data)} nextStep={() => setCurrentStep(7)} />;
            case 7:
                return <Travaux data={formData.travaux} updateData={(data: any) => updateFormData("travaux", data)} nextStep={() => setCurrentStep(8)} />;
            case 8:
                return <Informations data={formData.informations} updateData={(data: any) => updateFormData("informations", data)} nextStep={() => setCurrentStep(9)} btn="Obtenir mon estimations travaux" />;
            case 9:
                return <Resultats formData={formData} />;
            default:
                return <Logement data={formData.logement} updateData={(data: any) => updateFormData("logement", data)} nextStep={() => setCurrentStep(2)} />;
        }
    };

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
                        <h3 className={`text-lg cursor-pointer ${currentStep === 6 ? "font-bold" : "opacity-30"}`}> DPE</h3>
                    </div>
                    <div onClick={() => setCurrentStep(7)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 7 ? "font-bold" : "opacity-30"}`}> Travaux</h3>
                    </div>
                    <div onClick={() => setCurrentStep(8)}>
                        <h3 className={`text-lg cursor-pointer ${currentStep === 8 ? "font-bold" : "opacity-30"}`}> Informations</h3>
                    </div>
                </div>
            </section>
            <section className="px-12">
                <div className="w-full">
                    <h1>Obtenez estimation du montant des travaux</h1>
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
                    <div>{renderStep()}</div>
                    {/* <div>{<Travaux data={formData.travaux} updateData={(data: any) => updateFormData("travaux", data)} nextStep={() => setCurrentStep(6)} />}</div> */}
                    <p>
                        Avec ce simulateur, vous obtiendrez une estimation du montant des travaux nécessaires pour améliorer la performance énergétique de votre logement.<span className="font-bold"> Attention, cette estimation ne remplace pas un devis officiel. Seul un professionnel habilité peut vous fournir une évaluation précise des coûts et des travaux à réaliser.</span>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default SimulateurTravaux;
