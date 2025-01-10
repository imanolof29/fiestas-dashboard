import { Elements } from "@stripe/react-stripe-js";
import Routes from "./routes/Routes"
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe("pk_test_51P0V1vRvg7g5YeCB57u2WYZw6xhrUH57ZQnzyJXJYWTov1nKEZEpkDrxmlhkqYa9X6nDtJJ59mj2oWKFvMELoM8200ykpWzmIt");

function App() {
  return (
    <Elements stripe={stripe}>
      <Routes />
    </Elements>
  )
}

export default App