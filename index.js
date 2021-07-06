const Express = require('express');
const Transbank = require('transbank-sdk').WebpayPlus;

const app = Express();
app.set('port', process.env.PORT || 3000);
app.use(json());

app.all('/', (request, response, next) => {
  next();
});

app.post('/create', (request, response) => {
  let buyOrder = `O${String(Math.floor(Math.random() * 9999999))}`;
  let sessionId = `S${String(Math.floor(Math.random() * 9999999))}`;
  let amount = request.body.purchase.totalPrice;
  let returnUrl = 'https://www.google.com';

  Transbank.Transaction.create(buyOrder, sessionId, amount, returnUrl)
    .then((value) => {
      response.json(value);
    })
    .catch((value) => {
      response.json(value);
    });
});

app.listen(app.get('port'), () => {
  console.log(`Service Starting on Port ${app.get('port')}`);
});
