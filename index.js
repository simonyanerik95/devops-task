const express = require('express');
const app = express();
const port = 3000;

// Prometheus setup
const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics();

// Mock book data
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

// Define Prometheus metrics
const httpRequestTotal = new prometheus.Counter({
  name: 'http_request_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'method'],
});

const bookCount = new prometheus.Gauge({
  name: 'book_count',
  help: 'Total number of books',
});

// Set initial book count
bookCount.set(books.length);

// Define a route to retrieve all books
app.get('/', (req, res) => {
  res.json(books);
});

// Define a route to expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  try {
    // Increment the HTTP request counter
    httpRequestTotal.labels('/metrics', 'GET').inc();

    // Update book count metric
    bookCount.set(books.length);

    res.set('Content-Type', prometheus.register.contentType);
    res.end(await prometheus.register.metrics());
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
