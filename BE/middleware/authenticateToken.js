// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Ambil token dari header Authorization

//   if (!token) {
//     return res.sendStatus(401); // Kirim status 401 Unauthorized jika token tidak ada
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Kirim status 403 Forbidden jika token tidak valid
//     }
//     req.user = user; // Simpan informasi user ke req.user jika token valid
//     next(); // Lanjutkan ke route berikutnya
//   });
// };

// module.exports = authenticateToken;
