const MobileNav = () => {

  return (
    <div className="px-4">
      <nav>
        <ul className="flex flex-col gap-8">
          <li>
            <a href="/simulateurs/bilan-dpe">
              <div>
                <h2 className="mb-0">Bilan énergie</h2>
                <p className="text-xs">Obtenez la note de votre DPE estimée</p>
              </div>
            </a>
          </li>
          <li>
            <a href="/simulateurs/financements">
              <div>
                <h2 className="mb-0">Estimez vos travaux</h2>
                <p className="text-xs">Simulez le prix de vos travaux de rénovation énergétique.</p>
              </div>
            </a>
          </li>
          <li>
            <a href="/simulateurs/financements">
              <div>
                <h2 className="mb-0">Aides & Financements</h2>
                <p className="text-xs">Simulez les aides et financements disponibles pour vos travaux.</p>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileNav;