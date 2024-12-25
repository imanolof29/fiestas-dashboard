import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axiosInstance from '../../services';

interface PaymentFormProps {
    amount: number;
    eventId: string;
}

export const CheckoutForm: React.FC<PaymentFormProps> = ({ amount, eventId }) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            // Enviar al backend para crear un PaymentIntent
            const response = await axiosInstance.post('purchases/purchase', {
                quantity: amount, eventId,
            });

            // Verificar que el clientSecret sea correcto
            const { clientSecret } = response.data;

            if (!clientSecret) {
                throw new Error("El clientSecret no está disponible o es inválido.");
            }

            // Confirmar el pago con el clientSecret recibido
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            // Manejar el resultado
            if (result.error) {
                alert(result.error.message); // Error al procesar
            } else if (result.paymentIntent?.status === 'succeeded') {
                alert('¡Pago realizado con éxito!');
            } else if (result.paymentIntent?.status === 'requires_action') {
                // Si requiere autenticación adicional
                alert('Autenticación adicional requerida');
            } else {
                alert('El pago sigue pendiente');
            }

        } catch (error) {
            alert('Error en el procesamiento del pago: ' + error.message);
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={isProcessing || !stripe}>
                {isProcessing ? 'Procesando...' : 'Pagar'}
            </button>
        </form>
    );
};
