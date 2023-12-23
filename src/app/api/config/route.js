// pages/api/config.js

export const GET = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const email = process.env.email || 'default@email.com';
      res.status(200).json({ email });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Return method not allowed for other methods
  }
};
