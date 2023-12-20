// pages/api/config.js


export const GET = async (request) => {
  if (req.method === 'GET') {
    const email = process.env.email || 'default@email.com';
    res.status(200).json({ email });
  } else {
    res.status(405).end(); // Return method not allowed for other methods
  }
};
