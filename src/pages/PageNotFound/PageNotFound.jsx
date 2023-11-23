import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <p className="font-rancho text-2xl font-bold">The page you are looking is not Fund.
        Please go <Link to="/">Back to Home</Link>
      </p>
    </div>
  )
}

export default PageNotFound;