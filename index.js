const Express = require('express');
const Transbank = require('transbank-sdk').WebpayPlus;

const app = Express();
app.set('port', process.env.PORT || 3000);
app.use(Express.json());

app.all('/', (request, response, next) => {
  next();
});

app.post('/create', (request, response) => {
  console.log(request.body.purchase.totalPrice);
  response.send('ready!');
});

app.listen(app.get('port'), () => {
  console.log(`Service Starting on Port ${app.get('port')}`);
});