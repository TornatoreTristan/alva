const Newsletter = () => { 
  return (
    <div className="flex justify-center my-12 py-12">
      <div className="p-6 m-4 lg:p-12 w-full lg:w-2/3 bg-secondary rounded-3xl flex justify-center">
        <div className="lg:w-4/6 w-full">
          <h2 className="lg:text-3xl">Restez informé des actualités, des évolutions légales sur le marché immo et rénovation</h2>
          <p className="text-xs">Vous voulez suivre l'évolution du marché de l'immobilier, des travaux de rénovation et du diagnostic immobilier ? Inscrivez-vous à notre newsletter. Toutes nos actualités et celles de nos partenaires experts de leur domaine directement dans votre boite email. Ainsi, vous ne louperez plus jamais une opportunité de valoriser votre bien.</p>
          <div className="flex lg:flex-row flex-col items-center gap-4 justify-center mt-6">
            <input type="email" placeholder="Enter your email" className="w-full py-2 px-4 rounded" />
            <button className="bg-primary text-white p-2 ml-2 text-xs lg:w-[300px] rounded">M'inscrire à la newsletter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter