const Newsletter = () => { 
  return (
    <div className="flex justify-center my-12 py-12">
      <div className="p-12 w-2/3 bg-secondary rounded-3xl flex justify-center">
        <div className="w-4/6">
          <h2 className="text-3xl">Restez informé des actualités, des évolutions légales sur le marché immo et rénovation</h2>
          <p>Vous voulez suivre l'évolution du marché de l'immobilier, des travaux de rénovation et du diagnostic immobilier ? Inscrivez-vous à notre newsletter. Toutes nos actualités et celles de nos partenaires experts de leur domaine directement dans votre boite email. Ainsi, vous ne louperez plus jamais une opportunité de valoriser votre bien.</p>
          <div className="flex justify-center mt-6">
            <input type="email" placeholder="Enter your email" className="w-full py-2 px-4 rounded" />
            <button className="bg-primary text-white p-2 ml-2 text-xs w-[300px] rounded">M'inscrire à la newsletter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter