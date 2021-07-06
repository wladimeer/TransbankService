const Express = require('express');
const Transbank = require('transbank-sdk').WebpayPlus;

const app = Express();
app.set('port', process.env.PORT || 3000);
app.use(Express.json());

// app.all('/', (request, response, next) => {
//   next();
// });

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

app.post('/status', (request, response) => {
  const token = request.body.value.token;

  Transbank.Transaction.status(token)
    .then((value) => {
      switch (value.vci) {
        case 'TSY':
          CommitTransaction(token)
            .then((value) => {
              response.json({ success: value });
            })
            .catch((value) => {
              response.json({ error: value });
            });
          break;
        case 'TSN':
          response.json({ error: 'El Pago no Pudo Ser Completado!' });
          break;
      }
    })
    .catch((value) => {
      response.json({ error: 'Hubo un Error al Realizar el Pago!' });
    });
});

const CommitTransaction = (token) => {
  return new Promise((resolve, reject) => {
    Transbank.Transaction.commit(token)
      .then((response) => {
        switch (response.status) {
          case 'AUTHORIZED':
            resolve('Pago Realizado Correctamente!');
            break;
          case 'FAILED':
            reject('La Tarjeta Ingresada fue Declinada!');
            break;
        }
      })
      .catch((response) => {
        reject('Hubo un Error al Realizar el Pago!');
      });
  });
};

app.listen(app.get('port'), () => {
  console.log(`Service Starting on Port ${app.get('port')}`);
});
