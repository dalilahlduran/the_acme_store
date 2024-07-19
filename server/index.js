const express = require("express");
const {
  client,
  createFavorite,
  fetchUsers,
  fetchFavorites,
  fetchProducts,
  destroyFavorite,
} = require("./db");


const server = express();

client.connect();


server.use(express.json()); 


server.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});


server.get("/api/products", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (ex) {
    next(ex);
  }
});


server.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    res.send(await fetchFavorites({ user_id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
});


server.post("/api/users/:id/favorites", async (req, res, next) => {
  try {
    res.status(201).send(
      await createFavorite({
        user_id: req.params.id,
        skill_id: req.body.skill_id,
      })
    );
  } catch (ex) {
    next(ex);
  }
});


server.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
  try {
    await destroyFavorite({ id: req.params.id, user_id: req.params.userId });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});


server.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || err });
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));