import { useParams } from "react-router-dom";
import { CheckoutForm } from "../../../components/checkout-form/CheckoutForm";

export const PurchaseEventTicket = () => {

    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <p>Comprar ticket {id}</p>
            <CheckoutForm amount={1000} eventId={id ?? ""} />
        </div>
    )
}