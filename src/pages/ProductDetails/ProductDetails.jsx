import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { BiUpvote } from "react-icons/bi";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { email } = user || {};
  console.log(email);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:5000/allProducts")
      .then((res) => res.json())
      .then((data) => {
        const selectedProduct = data.find((pro) => pro._id === id);
        setProduct(selectedProduct);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleUpvote = (productId) => {
    if (user) {
      // Find the product by ID
      const newUpvotes = product.upvotes + 1;

      // Update the product's upvotes locally
      setProduct({ ...product, upvotes: newUpvotes });

      // Send data to the server
      fetch(`http://localhost:5000/upvotes/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upvotes: newUpvotes }),
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

//   const handleAddToCart = () => {
//     // You can customize the product data to send to the server
//     const productData = {
//       userEmail: email,
//       name
//     };

//     //send data to the server
//     fetch('http://localhost:5000/product', {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(productData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.acknowledged) {
//           Swal.fire({
//             icon: "success",
//             title: "Success!",
//             text: "Cart is added successfully",
//             confirmButtonText: "Cool",
//           });
//         }
//       });
//   };

  return (
    <div className="my-16 container mx-auto px-4 md:px-32">
      <div className="card lg:card-side bg-base-300 shadow-sm rounded-none p-10">
        <figure className="w-1/2 p-10">
          <img className="w-full" src={product.image} alt="Album" />
        </figure>
        <div className="card-body">
          <div>
            <h2 className="card-title font-rancho text-2xl font-bold p-5">
              {product.name}
            </h2>
            <p className="pl-5 font-raleway text-yellow-500">
              Category: {product.category}
            </p>
          </div>
          <div className="pl-5 mt-5">
            <p className="font-rancho font-bold text-2xl mb-2">£price</p>
            <p className="font-raleway">{product.tags}</p>
          </div>
          <div className="pl-5 mb-10">
            <p className="font-raleway text-xl text-gray-400">
              Description
            </p>
          </div>
          <div className="card-actions justify-center w-1/2 flex">
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
            <button className="btn btn-info w-full">Report now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;