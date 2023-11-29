import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [logedUser, setLogedUser] = useState([]);
  const [subscribe, setSubscribe] = useState({});
  const { name, email, photo } = logedUser;
  const newSubscription = { name, email, subscription: true };
  const { subscription } = subscribe || {};  console.log(subscription);

  useEffect(() => {
    if (user && user?.email) {
      fetch("https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/users")
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
    fetch("https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/subscribe")
      .then((res) => res.json())
      .then((data) =>  {
        const subscribed = data.find((subs) => subs.email === email);
        setSubscribe(subscribed);
      });
  }, []);

  const handleSubscription = () => {
    //send data to the server
    fetch("https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/subscribe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newSubscription),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img src={photo} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{email}</p>
          {
            subscription? "" : <div className="card-actions justify-end">
            <span>Subscribe your membership for life time</span>
            <Link onClick={handleSubscription}>
              <button className="btn btn-primary">£90</button>
            </Link>
          </div>
          
          }
          <p>Status:{subscription? "verified" : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
