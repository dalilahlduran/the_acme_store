const {
    client,
    createProduct,
    createTables,
    createUser,
    createFavorite,
    destroyFavorite,
    fetchProducts,
    fetchFavorites,
    fetchUsers,
  } = require("./db");
  
  const init = async () => {
    await client.connect();
  
    await createTables();
    console.log("create tables");
  
    const [deku, thor, loki] = await Promise.all([
      createUser({ name: "Karen", password: "pink123" }),
      createUser({ name: "Remy", password: "Ilovedogs44" }),
      createUser({ name: "Kyle", password: "Star88" }),
    ]);
  
    console.log(await fetchUsers());
    console.log("Seeded users");
  
    const [jump, purr, fetch] = await Promise.all([
      createProduct({ name: "Gum" }),
      createProduct({ name: "Lipgloss" }),
      createProduct({ name: "Iphone" }),
    ]);
  
    console.log(await fetchProducts());
    console.log("Seeded skills");
  
    const [us1, us2, us3] = await Promise.all([
      createFavorite({ user_id: karen.id, skill_id: lipgloss.id }),
      createFavorite({ user_id: remy.id, skill_id: gum.id }),
      createFavorite({ user_id: kyle.id, skill_id: iphone.id }),
    ]);
  
    console.log("Remy Favorites", await fetchFavorites({ user_id: remy.id }));
    console.log("Seeded Favorites");
  
    await destroyFavorite({ id: us2.id, user_id: remy.id });
  
    console.log("Remy Favorites", await fetchFavorites({ user_id: remy.id }));
  
    await client.end();
  };
  
  init();