import { Link } from "react-router-dom"
const ErrorPage = () => {
  return (
    <div>
        <h1>Something went wrong :( </h1>
        <p>Please check your internet connetion</p>
        <p>Or you're forbidden from this page.</p>
        <Link to="/" className="underline">Back to home page</Link>
    </div>
  )
}

export default ErrorPage