import Express from 'express';
const app = Express();

app.use((req, res) => {
  res.send('Hello World!')
});

app.listen(3000);