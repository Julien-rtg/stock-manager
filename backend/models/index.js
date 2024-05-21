const sequelize = require('../db/db').sequelize;

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!')
});