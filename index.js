const app = require('./src/app.js');
const pool = require('./src/pool');

pool
  .connect({
    host: 'database-1.cizjl1vpxwga.eu-central-1.rds.amazonaws.com',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'postgres',
  })
  .then(() => {
    app().listen(3005, () => {
      console.log('Listening on port 3005');
    });
  })
  .catch((err) => console.error(err));
