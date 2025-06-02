const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('tiktok')) {
    return res.status(400).json({ error: 'Invalid TikTok URL' });
  }

  try {
    const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari tikwm.com' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
