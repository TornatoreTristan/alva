import { useState, useEffect } from "react";

const Informations = ({ nextStep, btn }: any) => {
    const [motif, setMotif] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [optIn, setOptIn] = useState(false);

    const [showContact, setShowContact] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isTelephoneValid = /^\d{10}$/.test(telephone);
        if (motif && isEmailValid && isTelephoneValid) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [motif, email, telephone]);

    const handleMotifChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMotif(e.target.value);
        setShowContact(true);
    };

    return (
        <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
            <h3 className="text-2xl font-bold text-center mb-8">Pourquoi réalisez-vous cette simulation ?</h3>

            <div className="mb-8">
                <h4 className="text-xl font-bold mb-4">Pourquoi réalisez-vous cette simulation ?</h4>
                <div className="flex justify-center gap-8">
                    <select className="p-4 border rounded-lg w-full text-lg" value={motif} onChange={handleMotifChange}>
                        <option value="" disabled>
                            Veuillez sélectionner un motif
                        </option>
                        <option value="Par simple curiosité">Par simple curiosité</option>
                        <option value="Pour un futur achat">Pour un futur achat</option>
                        <option value="Pour une rénovation">Pour une rénovation</option>
                    </select>
                </div>
            </div>

            {showContact && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-center mb-4">Vos informations de contact</h3>
                    <div className="flex justify-center gap-8">
                        <div className="w-full">
                            <input type="email" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)} className="p-4 border rounded-lg w-full mb-4 text-lg" />
                            <input type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="p-4 border rounded-lg w-full text-lg" />
                        </div>
                    </div>
                </div>
            )}

            {showContact && (
                <div className="mb-8">
                    <div className="p-4">
                        <p className="text-gray-700 mb-4">Nous prenons la confidentialité de vos données très au sérieux. Afin de vous offrir des services personnalisés et des offres adaptées à vos besoins, nous souhaitons partager certaines de vos données personnelles avec nos partenaires sélectionnés. En cochant la case ci-dessous, vous consentez à ce que vos données personnelles soient partagées avec des partenaires externes dans le but de vous envoyer des offres promotionnelles adaptées à vos intérêts.</p>
                        <div className="flex items-start">
                            <input type="checkbox" id="optIn" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mr-2 mt-1" />
                            <label htmlFor="optIn" className="text-gray-700">
                                Je consens à ce que mes données personnelles soient partagées avec des partenaires externes à des fins de marketing personnalisé.
                            </label>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">Vous pouvez retirer votre consentement à tout moment en cliquant sur le lien de désabonnement dans nos emails ou en contactant notre service client à l'adresse suivante : [email@example.com].</p>
                        <p className="text-gray-500 text-sm mt-4">
                            Pour plus d'informations sur la façon dont nous utilisons vos données, veuillez consulter notre{" "}
                            <a href="#" className="text-blue-600 underline">
                                Politique de Confidentialité
                            </a>
                            .
                        </p>
                    </div>
                </div>
            )}

            <div className="text-center mt-8">
                <button onClick={nextStep} className={`px-8 py-4 font-bold rounded-lg ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`} disabled={isButtonDisabled}>
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default Informations;
