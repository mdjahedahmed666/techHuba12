import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";


const TrendingProducts = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      fetch("https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/allProducts")
        .then((res) => res.json())
        .then((data) =>  {
          const sortedProducts = data.sort((a, b) => b.upvotes - a.upvotes);
          setTrendingProducts(sortedProducts);
        });
    }, []);

    const handleUpvote = (productId) => {
      if (user) {
        // Find the product by ID
        const updatedProducts = trendingProducts.map((product) => {
          if (product._id === productId) {
            const newUpvotes = product.upvotes + 1;
  
            // Update the product's upvotes locally
            return { ...product, upvotes: newUpvotes };
          }
  
          return product;
        });
  
        // Update the state with the new upvotes
        setTrendingProducts(updatedProducts);
  
        // Send data to the server
        fetch(`https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/upvotes/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ upvotes: updatedProducts.find(product => product._id === productId).upvotes }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error);
            // Show an error notification using SweetAlert2
            Swal.fire({
              icon: "error",
              title: "Upvote Error",
              text: "There was an error processing your upvote. Please try again.",
            });
          });
      }
    };

    return (
      <div className="container mx-auto px-4 md:px-32  mb-15">
        <h2 className="font-bold font-rancho text-2xl text-black text-center mb-10">
          Trending Products
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {trendingProducts.slice(0,6).map((product, index) => (
            <div key={index} className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img src={product.image} alt="Shoes" />
              </figure>
              <div className="card-body">
              <Link to={`/productDetails/${product._id}`} className="card-title underline">
                <h2>{product.name}</h2>
              </Link>
                <p>{product.tags.join(", ")} </p>
                <div>
                  <button
                    onClick={() => handleUpvote(product._id)}
                    className={user ? "btn btn-circle" : "btn btn-circle"}
                    disabled={!user}
                  >
                    <BiUpvote />
                  </button>{" "}
                  <span>{product.upvotes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/allProducts" className="flex justify-center mt-5">
        <button className="btn btn-primary">All Products</button>
        </Link>
      </div>
    );
}

export default TrendingProducts;