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
    NextResponse.end(); // Return method not allowed for other methods
  }
};
