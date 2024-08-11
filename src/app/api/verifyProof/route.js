// src/app/api/verifyProof/route.js

export async function POST(request) {
  try {
    const { proof } = await request.json();
    
    // Send proof to the Worldcoin API for verification
    const response = await fetch(
      'https://developer.worldcoin.org/api/v1/verify/app_staging_129259332fd6f93d4fabaadcc5e4ff9d', // Ensure this is the correct endpoint
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...proof, action: "worldwise-1" }), // Ensure action matches your setup
      }
    );

    if (response.ok) {
      const { verified } = await response.json();
      return new Response(JSON.stringify({ verified }), { status: 200 });
    } else {
      const { code, detail } = await response.json();
      return new Response(JSON.stringify({ error: `Error Code ${code}: ${detail}` }), { status: response.status });
    }
  } catch (error) {
    console.error('Verification API error:', error); // Added logging for debugging
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
