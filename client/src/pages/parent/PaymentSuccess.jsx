import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCheckLine } from 'react-icons/ri';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/dashboard/facilityfee');
    }, 5000);

    const intervalId = setInterval(() => {
      if (seconds <= 1) {
        clearInterval(intervalId); // Stop the interval when seconds is less than or equal to 1
        return;
      }
      setSeconds((prev) => prev - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

    // Clear the timeout when the component unmounts or when the redirect occurs
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>You Will Redirect to the Fees page after {seconds} seconds</h1>
      <div style={{ borderRadius: '50%', border: '5px solid green', padding: '10px', display: 'inline-block' }}>
        <RiCheckLine style={{ fontSize: '10em', color: 'green' }} />
      </div>
      <h2 style={{ fontSize: '5em', color: 'green' }}>Payment Successful!</h2>
    </div>
  );
}

export default PaymentSuccess;
