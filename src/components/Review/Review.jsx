import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Review = ({productId}) => {
  const [loading, setLoading] = useState(true);
  const [logedUser, setLogedUser] = useState([]);
  const [userReview, setUserReview] = useState([]);

  const { user } = useContext(AuthContext);
  const { email } = user || {};

  useEffect(() => {
    if (user && user?.email) {
      fetch('http://localhost:5000/users')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const matchedUser = data.find(
            (userData) => userData.email === user.email
          );
          console.log(matchedUser);
          if (matchedUser) {
            setLogedUser(matchedUser);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Set userData to a default value or an empty object
      setLogedUser([]);
    }
  }, [user]);
  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => {
        const userView = data.filter(review => review.id===productId);
        console.log(userReview);
        setUserReview(userView);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const photo = form.get("photo");
        const review = form.get("review");
        const rating = form.get("rating");
        console.log(review, rating);
        // const user = userBooked.find((user) => user.email === email);
    
        const newReview = {
          email,
          name,
          photo,
          review,
          rating,
          productId,
        };
    
        fetch("http://localhost:5000/review", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newReview),
        })
          .then((res) => res.json())
          .then((data) => {
            setUserReview([...userReview, newReview]);
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "review is added successfully",
              confirmButtonText: "Cool",
            });
          });
      };
    return (
        <div className="container mx-auto px-4 md:px-32 my-16">
          <div>
          
              <form onSubmit={handleSubmit} className="w-full">
                <div className="form-control">
                  <label className="label">
                    <span className="text-base">Reviewer Name</span>
                  </label>
                  <input type="text" name="name" required defaultValue={logedUser.name} placeholder="name" className="input input-bordered" readOnly={true}/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-base">Reviewer photo URL</span>
                  </label>
                  <input type="text" name="photo" required defaultValue={logedUser.photo} placeholder="name" className="input input-bordered" readOnly={true}/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-base">Write your review</span>
                  </label>
                  <textarea
                    name="review"
                    className="textarea textarea-primary"
                    placeholder="Review"
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-base">Provide rating 1-5</span>
                  </label>
                  <input
                    type="number"
                    name="rating"
                    required
                    placeholder="Rating"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control my-6">
                  <button className="btn btn-outline btn-[#331A15]">Submit</button>
                </div>
              </form>
          </div>
          <h2>Customers reviews</h2>
          {loading ? (
            <p>Loading reviews...</p>
          ) : userReview.length > 0 ? (
            <div className="grid gap-1 grid-flow-col md:grid-cols-3">
              {userReview.map((item, index) => (
                <div key={index} className="card bg-yellow-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.review}</p>
                    <div className="card-actions justify-end">
                      <p>Rating: {item.rating} out of 5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      );
}

export default Review