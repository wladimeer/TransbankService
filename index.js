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
  response.send(purchase);
  // response.json({ name: 'purchase' });
});

app.listen(app.get('port'), () => {
  console.log(`Service Starting on Port ${app.get('port')}`);
});
