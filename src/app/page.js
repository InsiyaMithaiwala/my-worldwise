// src/app/page.js

import WorldIDVerification from "/components/WorldIDVerification";

export default function Home() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop:"250px"
        
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Welcome to WorldWise</h1>
        <WorldIDVerification />
      </div>
    </div>
  );
}
