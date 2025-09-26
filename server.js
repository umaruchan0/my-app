const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const { products } = require("./data");

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/api", (req, res) => {
  res.send('<h1>klick this</h1><a href="/api/products">here</a>');
});

app.get("/api/products", (req, res) => {
  const newProdut = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProdut);
});

app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleproduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleproduct) {
    return res.status(404).send(`There is no product with  Id: ${productID}`);
  } else {
    return res.json(singleproduct);
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.toLowerCase().startsWith(search.toLowerCase());
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  res.status(200).json(sortedProducts);
});

app.get("/json", (req, res) => {
  res.json(products);
});

app.use((req, res, next) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(port, () => {
  console.log(`we are at ${port} port`);
});
