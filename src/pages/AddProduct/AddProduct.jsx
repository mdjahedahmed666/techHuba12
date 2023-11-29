import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const AddProduct = () => {
  const [logedUser, setLogedUser] = useState([]);
  const { user } = useContext(AuthContext);
  const { email } = user || {};


  useEffect(() => {
    if (user && user?.email) {
      fetch('https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const owner_photo = form.owner_photo.value;
        const owner_name = form.owner_name.value;
        const tags = form.tags.value;
        const shortDescription = form.shortDescription.value;
        const photo = form.photo.value;
        const link = form.link.value;
        const upvote = form.upvote.value;
        const owner_email   = form.owner_email.value;

        const newProduct = {name, shortDescription, photo,owner_name, owner_photo, tags, link,owner_email,upvote }


        //send data to the server
        fetch("https://techhub-server-n5dugvzfl-mdjahedahmed12-gmailcom.vercel.app/allProducts", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product is added successfully',
                confirmButtonText: 'Cool'
              })
              // Reset the form input fields
        form.reset();
            }
           
        })

    };
  return (
    <div className="hero min-h-screen bg-[#F4F3F0]">
    <div className="hero-content flex-col">
      <div className="text-center">
        <h1 className="text-5xl font-bold mt-10 font-rancho">Add new Product</h1>
        <p className="text-lg mt-2 font-raleway">Be careful! Put right information</p>
      </div>
      <div className="w-full lg:w-[600px] shadow-smbg-base-100 p-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control">
            <label className="label">
              <span className="text-base">Name</span>
            </label>
            <input type="text" name="name" required placeholder="name" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Short description</span>
            </label>
            <input type="text" name="shortDescription" required placeholder="short description" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Photo URL</span>
            </label>
            <input type="text" name="photo" required placeholder="photo url" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Owner Email</span>
            </label>
            <input type="email" name="owner_email" defaultValue={logedUser.email} required placeholder="email" className="input input-bordered" disabled/>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Owner Name</span>
            </label>
            <input type="text" name="owner_name" defaultValue={logedUser.name} required placeholder="name" className="input input-bordered" disabled/>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Owner Photo URL</span>
            </label>
            <input type="text" name="owner_photo" defaultValue={logedUser.photo} required placeholder="photo url" className="input input-bordered" disabled/>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Tags</span>
            </label>
            <input type="text" name="tags" required placeholder="photo url" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">External Link</span>
            </label>
            <input type="text" name="link" required placeholder="photo url" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-base">Upvotes</span>
            </label>
            <input type="tnumber" name="upvote" required placeholder="upvote" defaultValue={0} className="input input-bordered" />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-outline btn-[#331A15]">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddProduct;