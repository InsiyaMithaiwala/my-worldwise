// src/components/WorldVerification.js

"use client";
import { useRouter } from "next/navigation";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const verifyProof = async (proof) => {
  try {
    const response = await fetch("/api/verifyProof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Verification error:", error);
    return false;
  }
};

const WorldVerification = () => {
  const router = useRouter();

  const onSuccess = () => {
    console.log("Verification successful");
    router.push("https://world-wise-flame.vercel.app/verified.html");
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#005bb5",
  };

  return (
    <div style={containerStyle}>
      <IDKitWidget
        app_id="app_ec003b2ccef8c41dc3985fc115e4cd47"
        action="worldwise-1"
        verification_level={VerificationLevel.Device}
        handleVerify={verifyProof}
        onSuccess={onSuccess}
      >
        {({ open }) => (
          <button
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
            onClick={open}
          >
            Verify with World ID
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default WorldVerification;
