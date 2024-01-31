import React ,{useEffect, useState}from 'react';
import { TiTick } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
function PaymentSuccessful() {
  const navigate = useNavigate()
useEffect(()=>{
setTimeout(()=>{
 navigate("/")
},10000)
},[])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#e6e6e6', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TiTick style={{ fontSize: '100px', color: 'green', backgroundColor: '#e6ffe6', padding: '5px', 
        borderRadius: '50%',marginTop:"50px" }} />
        <h1 style={{ fontWeight: 'bold', color: 'green' }}>Success</h1>
        <p style={{ textAlign: 'center',marginBottom:"50px" }}>We received your purchase request;<br />we'll be in touch shortly!</p>
      </div>
    </div>
  );
}

export default PaymentSuccessful;

