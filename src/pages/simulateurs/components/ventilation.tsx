import { useState, useEffect } from "react";

const Ventilation = ({ nextStep }: any) => {
    const [climatisation, setClimatisation] = useState("");
    const [ventilationType, setVentilationType] = useState("");

    const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

    useEffect(() => {
        if (climatisation && ventilationType) {
            setIsNextButtonVisible(true);
        }
    }, [climatisation, ventilationType]);

    useEffect(() => {
        const savedVentilationData = sessionStorage.getItem("ventilationData");
        if (savedVentilationData) {
            const { climatisation, ventilationType } = JSON.parse(savedVentilationData);
            setClimatisation(climatisation);
            setVentilationType(ventilationType);
        }
    }, []);

    useEffect(() => {
        const ventilationData = { climatisation, ventilationType };
        sessionStorage.setItem("ventilationData", JSON.stringify(ventilationData));
    }, [climatisation, ventilationType]);

    const handleClimatisationSelect = (option: string) => {
        setClimatisation(option);
    };

    const handleVentilationTypeSelect = (option: string) => {
        setVentilationType(option);
    };

    return (
        <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
            <h3 className="text-2xl font-bold text-center mb-8">Ventilation</h3>

            <div className="mb-8">
                <h4 className="text-xl font-bold mb-4">Climatisation</h4>
                <div className="flex justify-center gap-8">
                    {["Oui", "Non"].map((option) => (
                        <div key={option} className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${climatisation === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"}`} onClick={() => handleClimatisationSelect(option)}>
                            <input type="radio" id={option} name="climatisation" value={option} checked={climatisation === option} onChange={() => handleClimatisationSelect(option)} className="hidden" />
                            <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                                <span className="text-lg font-semibold text-gray-800">{option}</span>
                            </label>
                            <div className="ml-4">
                                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${climatisation === option ? "border-primary" : "border-gray-400"}`}>{climatisation === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {climatisation && (
                <div className="mb-8">
                    <h4 className="text-xl font-bold mb-4">Type de ventilation (en dehors de la salle de bain)</h4>
                    <div className="flex justify-center gap-8">
                        {["Ventilation naturelle", "VMC simple flux", "VMC double flux"].map((option) => (
                            <div key={option} className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${ventilationType === option ? "border-primary bg-secondary" : "border-gray-200 bg-white"}`} onClick={() => handleVentilationTypeSelect(option)}>
                                <input type="radio" id={option} name="ventilationType" value={option} checked={ventilationType === option} onChange={() => handleVentilationTypeSelect(option)} className="hidden" />
                                <label htmlFor={option} className="flex gap-3 items-center cursor-pointer">
                                    <span className="text-lg font-semibold text-gray-800">{option}</span>
                                </label>
                                <div className="ml-4">
                                    <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${ventilationType === option ? "border-primary" : "border-gray-400"}`}>{ventilationType === option && <div className="w-3 h-3 bg-primary rounded-full"></div>}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isNextButtonVisible && (
                <div className="text-center mt-8">
                    <button onClick={nextStep} className="px-8 py-4 bg-primary text-white font-bold rounded-lg">
                        Étape Suivante
                    </button>
                </div>
            )}
        </div>
    );
};

export default Ventilation;
