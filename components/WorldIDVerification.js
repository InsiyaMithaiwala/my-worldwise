// src/components/WorldVerification.js

"use client";
import { useRouter } from 'next/navigation';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

const verifyProof = async (proof) => {
  try {
    const response = await fetch('/api/verifyProof', { // Point to your API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proof),
    });
    
    const data = await response.json();
    if (response.ok) {
      return data.verified;
    } else {
      throw new Error(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
};

const WorldVerification = () => {
  const router = useRouter();

  const onSuccess = () => {
    console.log("Verification successful");
    router.push('https://world-wise-flame.vercel.app/verified.html');
  };

  return (
    <IDKitWidget
      app_id="app_ec003b2ccef8c41dc3985fc115e4cd47"
      action="worldwise-1"
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}
    >
      {({ open }) => (
        <button onClick={open}>
          Verify with World ID
        </button>
      )}
    </IDKitWidget>
  );
};

export default WorldVerification;
