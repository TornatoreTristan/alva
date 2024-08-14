// @ts-nocheck
import { useState, useEffect } from 'react';
import { HiOutlineCheck } from "react-icons/hi2";
import Logement from "./logement";
import Isolation from "./isolation";
import Equipements from "./equipements";
import Informations from "./informations";
import Configuration from "./configuration";
import Ventilation from "./ventilation";
import Resultats from './resultats';

const SimulateurDPE = () => {
  const [currentStep, setCurrentStep] = useState(1); 
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      logement: {} as any,
      configuration: {} as any,
      isolation: {} as any,
      equipements: {} as any,
      ventilation: {} as any,
      informations: {} as any
    };
  });

  useEffect(() => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (step: string, data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Logement data={formData.logement} updateData={(data: any) => updateFormData('logement', data)} nextStep={() => setCurrentStep(2)} />;
      case 2:
        return <Configuration data={formData.isolation} updateData={(data: any) => updateFormData('configuration', data)} nextStep={() => setCurrentStep(3)} />;
      case 3:
        return <Isolation data={formData.isolation} updateData={(data: any) => updateFormData('isolation', data)} nextStep={() => setCurrentStep(4)} />;
      case 4:
        return <Equipements data={formData.equipements} updateData={(data: any) => updateFormData('equipements', data)} nextStep={() => setCurrentStep(5)} />;
      case 5:
        return <Ventilation data={formData.equipements} updateData={(data: any) => updateFormData('ventilation', data)} nextStep={() => setCurrentStep(6)} />;
      case 6:
        return <Informations data={formData.informations} updateData={(data: any) => updateFormData('informations', data)} nextStep={() => setCurrentStep(7)}  />;
      case 7:
        return <Resultats formData={formData} />;
      default:
        return <Logement data={formData.logement} updateData={(data: any) => updateFormData('logement', data)} nextStep={() => setCurrentStep(2)} />;
    }
  };

  return (
    <main className="flex min-h-[70vh] gap-12 px-12 my-8">
      <section className="w-1/3">
        <h2 className="text-2xl">Votre simulation</h2>
        <hr />
        <div>
          <div onClick={() => setCurrentStep(1)}>
            <h3 className={`text-lg cursor-pointer ${currentStep === 1 ? 'font-bold' : 'opacity-30'}`}>Logement</h3>
          </div>
          <div onClick={() => setCurrentStep(2)}>
            <h3 className={`text-lg cursor-pointer ${currentStep === 2 ? 'font-bold' : 'opacity-30'}`}> configuration du bien</h3>
          </div>
          <div onClick={() => setCurrentStep(3)}>
            <h3 className={`text-lg cursor-pointer ${currentStep === 3 ? 'font-bold' : 'opacity-30'}`}>Isolation</h3>
          </div>
          <div onClick={() => setCurrentStep(4)}>
            <h3 className={`text-lg cursor-pointer ${currentStep === 4 ? 'font-bold' : 'opacity-30'}`}> Équipements</h3>
          </div>
          <div onClick={() => setCurrentStep(5)}>
            <h3 className={`text-lg cursor-pointer ${currentStep === 5 ? 'font-bold' : 'opacity-30'}`}> Ventilation</h3>
          </div>
          <div onClick={() => setCurrentStep(6)}>
            <h3 className={`text-lg cursor-pointer ${currentStep === 6 ? 'font-bold' : 'opacity-30'}`}> Informations</h3>
          </div>
        </div>
      </section>
      <section className="px-12">
        <div className="w-full">
          <h1>Obtenez une estimation de la note de votre DPE</h1>
          <div className="flex items-center gap-3 my-4">
            <p className="flex items-center px-4 py-2 rounded bg-primary text-secondary stroke-secondary gap-2 font-bold"><HiOutlineCheck className="stroke-secondary" /> Gratuit</p>
            <p className="flex items-center px-4 py-2 rounded bg-primary text-secondary stroke-secondary gap-2 font-bold"><HiOutlineCheck className="stroke-secondary" /> 3 minutes</p>
            <p className="flex items-center px-4 py-2 rounded bg-primary text-secondary stroke-secondary gap-2 font-bold"><HiOutlineCheck className="stroke-secondary" /> Un bilan complet</p>
          </div>
          <div>
            {renderStep()}
          </div>
          <p>Avec ce simulateur, vous obtiendrez une estimation de l'étiquette énergétique de votre logement. Cette simulation se base sur une méthode adaptée du 3CL de l'ADEME.<span className="font-bold"> Attention, la note obtenue ne se substitue pas à un DPE certifié. Seul un professionnel certifié par l'ADEME est en mesure de vous fournir la note officielle de votre logement.</span></p>
        </div>
      </section>
    </main>
  );
};

export default SimulateurDPE;
