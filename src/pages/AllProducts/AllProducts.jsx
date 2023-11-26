import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { BiUpvote } from "react-icons/bi";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      fetch("http://localhost:5000/allProducts")
        .then((res) => res.json())
        .then((data) =>  {
            setProducts(data);
        });
    }, []);

    const handleUpvote = (productId) => {
      if (user) {
        // Find the product by ID
        const updatedProducts = products.map((product) => {
          if (product._id === productId) {
            const newUpvotes = product.upvotes + 1;
  
            // Update the product's upvotes locally
            return { ...product, upvotes: newUpvotes };
          }
  
          return product;
        });
  
        // Update the state with the new upvotes
        setProducts(updatedProducts);
  
        // Send data to the server
        fetch(`http://localhost:5000/upvotes/${productId}`, {
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
      <div className="container mx-auto px-4 md:px-32  my-20 py-10">
        <h2 className="font-bold font-rancho text-2xl text-black text-center mb-10">
          All Products
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {products.map((product, index) => (
            <div key={index} className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img src={product.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <Link to="/productDetails" className="card-title underline">
                  <h2>{product.name}</h2>
                </Link>
                <p>{product.tags.join(", ")} </p>
                <div>
                  <button
                    onClick={() => handleUpvote(product._id)}
                    className={user ? "btn btn-circle" : "btn btn-circle"}
                    disabled={!user}
                  >
                    <BiUpvote/>
                  </button>{" "}
                  <span>{product.upvotes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default AllProducts;