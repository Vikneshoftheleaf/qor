const express = require('express');
const app = express();
const port = 3000;
const qrcode = require('qrcode');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/',(res,req)=>{
    //res.sendFile("index.html");
    res.render('index');
})

app.get('/generate', async (req, res) => {
    const url = req.query.url;
    try {
      const qrCode = await qrcode.toDataURL(url);
      const qdata = {
        "qrcode": qrCode
      };
      res.render('gen', qdata)
    } catch (error) {
      res.status(500).send('Error generating QR code');
    }
  });
  

app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
})