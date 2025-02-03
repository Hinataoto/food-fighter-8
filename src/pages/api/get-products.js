import { Connection, Request } from 'tedious';
import { dbConfig } from './db-config';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const connection = new Connection(dbConfig);
  const products = [];

  connection.on('connect', (err) => {
    if (err) {
      console.error('Connection error:', err);
      res.status(500).json({ error: 'Database connection failed', details: err.message });
      return;
    }

    console.log('Connected to database, executing query...');

    const request = new Request(
      `SELECT TOP 100 * FROM [dbo].[Products] ORDER BY ExpiryDate ASC`,
      (err, rowCount) => {
        if (err) {
          console.error('Query error:', err);
          res.status(500).json({ error: 'Failed to fetch products', details: err.message });
          return;
        }
        console.log(`Query completed, found ${rowCount} products`);
      }
    );

    request.on('row', (columns) => {
      const product = {};
      columns.forEach((column) => {
        product[column.metadata.colName] = column.value;
      });
      console.log('Retrieved product:', product);
      products.push(product);
    });

    request.on('done', (rowCount) => {
      console.log('Request done, rowCount:', rowCount);
    });

    request.on('requestCompleted', () => {
      console.log('Request completed, products:', products);
      connection.close();
      res.status(200).json(products);
    });

    connection.execSql(request);
  });

  connection.on('error', (err) => {
    console.error('Connection error event:', err);
    res.status(500).json({ error: 'Database connection error', details: err.message });
  });

  console.log('Connecting to database...');
  connection.connect();
}