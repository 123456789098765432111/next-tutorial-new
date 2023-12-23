// pages/api/config.js

export const GET = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const email = process.env.email || 'default@email.com';
      res.json({ email },{status:200});
    } catch (error) {
      res.json({ error: 'Internal Server Error' },{status:500});
    }
  } else {
    res.end(); // Return method not allowed for other methods
  }
};
