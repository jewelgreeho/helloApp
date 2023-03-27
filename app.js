// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let products = [];

app.use(bodyParser.json());

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a single product by id
app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.json(product);
});

// Create a new product
app.post('/products', (req, res) => {
  const product = req.body;
  product.id = Date.now().toString();

  products.push(product);

  res.status(201).json(product);
});

// Update a product by id
app.put('/products/:id', (req, res) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  const updatedProduct = { ...products[productIndex], ...req.body };

  products[productIndex] = updatedProduct;

  res.json(updatedProduct);
});

// Delete a product by id
app.delete('/products/:id', (req, res) => {
  products = products.filter((p) => p.id !== req.params.id);

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
