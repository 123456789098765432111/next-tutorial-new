import { NextResponse,NextRequest } from "next/server";

// pages/api/config.js

export const GET = async () => {
  if (NextRequest.method === 'GET') {
    try {
      const email = process.env.email || 'default@email.com';
      NextResponse.json({ email },{status:200});
    } catch (error) {
      NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
  } else {
    NextResponse.json({ message:"Not Allowed" },{status:403}); // Return method not allowed for other methods
  }
};
