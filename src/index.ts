import app from './app';
import sequelize from './database/dataBase';

const port = process.env.PORT || 3000;

sequelize
  .sync({alter: true})
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
