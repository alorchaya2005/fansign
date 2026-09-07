import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function StripeSuccess() {
  const { billingId, token } = useParams();
  useEffect(() => {
    async function markStripeBillAsPaid() {
      const res = await fetch(
        `http://localhost:4000/api/musk/payment/mark-stripe-payment-success/${billingId}/${token}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    }
    markStripeBillAsPaid();
  }, []);
  return <div>success</div>;
}

export default StripeSuccess;
