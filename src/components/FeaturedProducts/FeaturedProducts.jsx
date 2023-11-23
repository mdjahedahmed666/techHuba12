import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/featuredProducts")
        .then((res) => res.json())
        .then((data) => setFeaturedProducts(data));
    }, []);
  return (
    <div className="container mx-auto px-4 md:px-32  my-28 py-10">
      <h2 className="font-bold font-rancho text-2xl text-black text-center mb-10">
        Featured Products
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      {featuredProducts.map((product, index) => (
        <div
          key={index}
          className="card card-compact bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src={product.image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
          <Link to="/productDetails" className="card-title underline">
            <h2 >{product.name}</h2>
            </Link>
            <p>{product.tags.join(', ')} </p>  
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default FeaturedProducts