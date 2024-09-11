import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useState, useEffect } from 'react';

const Logement = ({ nextStep }: { nextStep: () => void }) => {
  const [selectedType, setSelectedType] = useState("");
  const [showPostalCode, setShowPostalCode] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [showConstructionYear, setShowConstructionYear] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const savedData = sessionStorage.getItem('logementData');
    if (savedData) {
      const { selectedType, postalCode, selectedYear } = JSON.parse(savedData);
      setSelectedType(selectedType);
      setPostalCode(postalCode);
      setSelectedYear(selectedYear);
      if (selectedType) setShowPostalCode(true);
      if (postalCode.length === 5) setShowConstructionYear(true);
    }
  }, []);

  useEffect(() => {
    const logementData = {
      selectedType,
      postalCode,
      selectedYear,
    };
    sessionStorage.setItem('logementData', JSON.stringify(logementData));
  }, [selectedType, postalCode, selectedYear]);

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setShowPostalCode(true);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setPostalCode(value);
      if (value.length === 5) {
        setShowConstructionYear(true); 
      } else {
        setShowConstructionYear(false); 
      }
    }
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <div className="p-8 bg-[#F9FFE6] rounded-lg border border-primary my-12">
      <h3 className="text-2xl font-bold text-center mb-8">À propos de votre logement, est-ce un appartement ou une maison ?</h3>
      <div className="flex justify-center gap-8">
        <div
          className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
            selectedType === 'maison' ? 'border-primary bg-secondary' : 'border-gray-200 bg-white'
          }`}
          onClick={() => handleSelect("maison")}
        >
          <input
            type="radio"
            id="maison"
            name="type"
            value="maison"
            checked={selectedType === 'maison'}
            onChange={() => handleSelect("maison")}
            className="hidden"
          />
          <label htmlFor="maison" className="flex gap-3 items-center cursor-pointer">
            <HiOutlineHomeModern className="text-secondary w-10 h-10" />
            <span className="text-lg font-semibold text-gray-800">Maison</span>
          </label>
          <div className="ml-4">
            <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
              selectedType === 'maison' ? 'border-primary' : 'border-gray-400'
            }`}>
              {selectedType === 'maison' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
            selectedType === 'appartement' ? 'border-primary bg-secondary' : 'border-gray-200 bg-white'
          }`}
          onClick={() => handleSelect("appartement")}
        >
          <input
            type="radio"
            id="appartement"
            name="type"
            value="appartement"
            checked={selectedType === 'appartement'}
            onChange={() => handleSelect("appartement")}
            className="hidden"
          />
          <label htmlFor="appartement" className="flex gap-3 items-center cursor-pointer">
            <HiOutlineBuildingOffice2 className=" w-10 h-10" />
            <span className="text-lg font-semibold text-gray-800">Appartement</span>
          </label>
          <div className="ml-4">
            <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
              selectedType === 'appartement' ? 'border-primary' : 'border-gray-400'
            }`}>
              {selectedType === 'appartement' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
            </div>
          </div>
        </div>
      </div>

      {showPostalCode && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">Quel est votre code postal ?</h3>
          <div className="flex justify-center">
            <input
              type="text"
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="Entrez votre code postal"
              className="p-2 border rounded-lg focus:outline-none focus:border-primary focus:border-2"
            />
          </div>
          {postalCode.length !== 5 && (
            <p className="text-primary mt-2 text-center text-sm">Veuillez entrer un code postal valide de 5 chiffres.</p>
          )}
        </div>
      )}

      {showConstructionYear && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">Quelle est l'année de construction de votre logement ?</h3>
          <div className="flex justify-center gap-2">
            {['Avant 1949', 'Entre 1950 et 1997', 'Entre 1998 et 2012', 'Après 2012'].map((year) => (
              <div
                key={year}
                className={`flex items-center justify-between p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedYear === year ? 'border-primary bg-secondary' : 'border-gray-200 text-sm bg-white'
                }`}
                onClick={() => handleYearSelect(year)}
              >
                <input
                  type="radio"
                  id={year}
                  name="constructionYear"
                  value={year}
                  checked={selectedYear === year}
                  onChange={() => handleYearSelect(year)}
                  className="hidden"
                />
                <label htmlFor={year} className="flex gap-3 items-center cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{year}</span>
                </label>
                <div className="ml-4">
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                    selectedYear === year ? 'border-primary' : 'border-gray-400'
                  }`}>
                    {selectedYear === year && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedType && postalCode.length === 5 && selectedYear && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all"
          >
            Étape suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default Logement;
