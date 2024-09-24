import { useState, useEffect } from "react";

const NoteDEP = ({ nextStep }: any) => {
    const [selectedNoteDEP, setSelectedNoteDEP] = useState<string[]>([]);
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

    useEffect(() => {
        // Vérifie si au moins un travail est sélectionné
        setIsNextButtonVisible(selectedNoteDEP.length > 0);
    }, [selectedNoteDEP]);

    const handleNoteDEPSelect = (NoteDEP: string) => {
        setSelectedNoteDEP((prev) => {
            if (prev.includes(NoteDEP)) {
                return prev.filter((item) => item !== NoteDEP); // Désélectionner
            } else {
                return [...prev, NoteDEP]; // Sélectionner
            }
        });
    };

    return (
        <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
            <h3 className="text-2xl font-bold text-center mb-8">NoteDEP</h3>

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

export default NoteDEP;
