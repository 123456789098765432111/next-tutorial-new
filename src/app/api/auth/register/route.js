import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
const express = require('express');
const app = express();

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
//GET
// Assuming an Express.js-like framework for handling API routes
// Handle GET request to '/api/auth/register'
app.get('/api/auth/register',  (req, res) => {
  try {
    // Perform operations to fetch user data from the database or other sources
    const users =  User.find({}, { password: 0 });

    // Respond with the fetched users as JSON
    res.status(200).json(users);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching users:', error);

    // Send an error response with a 500 status code and an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
