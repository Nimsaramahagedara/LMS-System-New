
{/*Loku green color Tick ekak ekka success page ekak, setTimeout function eka
use krala thappara thunakin witara auto navigate krnna PayFees page ekata*/}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCheckLine } from 'react-icons/ri';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to the facilityfee page after 5 seconds
      navigate('/dashboard/facilityfee');
    }, 5000);

    // Clear the timeout when the component unmounts or when the redirect occurs
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ borderRadius: '50%', border: '5px solid green', padding: '10px', display: 'inline-block' }}>
        <RiCheckLine style={{ fontSize: '10em', color: 'green' }} />
      </div>
      <h2 style={{ fontSize: '5em', color: 'green' }}>Payment Successful!</h2>
    </div>
  );
}

export default PaymentSuccess;
