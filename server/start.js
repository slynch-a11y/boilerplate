const app = require('./app');
const db = require('../db/_db.js')

const init = async() => {

  await db.sync();
  const port = 4000;
  app.listen(port, () => {
  console.log('Server is listening on port ', port);
  });

}

init();

//const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
