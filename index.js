const Express = require('express');
const Transbank = require('transbank-sdk').WebpayPlus;

const app = Express();
app.set('port', process.env.PORT || 3000);
app.use(Express.json());

app.all('/', (request, response, next) => {
  next();
});

app.post('/create', (request, response) => {
  const purchase = request.body.purchase;
  const a = request.body.purchase.totalPrice;

  // let buyOrder = `O${String(Math.floor(Math.random() * 9999999))}`;
  // let sessionId = `S${String(Math.floor(Math.random() * 9999999))}`;
  // let amount = request.body.purchase.totalPrice;
  // let returnUrl = 'https://www.google.com';

  // Transbank.Transaction.create(buyOrder, sessionId, amount, returnUrl)
  //   .then((response) => {
  //     response.send(response);
  //   })
  //   .catch((response) => {
  //     response.send(response);
  //   });

  response.send(a);
  // response.json({ name: 'purchase' });
});

app.listen(app.get('port'), () => {
  console.log(`Service Starting on Port ${app.get('port')}`);
});
