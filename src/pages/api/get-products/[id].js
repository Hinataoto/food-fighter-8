import { Connection, Request, TYPES } from 'tedious';
import { dbConfig } from '../db-config';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  console.log('Fetching product with ID:', id);

  const connection = new Connection(dbConfig);
  let product = null;

  connection.on('connect', (err) => {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ 
        error: 'Database connection failed', 
        details: err.message 
      });
    }

    console.log('Connected to database, executing query...');

    const request = new Request(
      'SELECT * FROM [dbo].[Products] WHERE Id = @id',
      (err, rowCount) => {
        if (err) {
          console.error('Query error:', err);
          return res.status(500).json({ 
            error: 'Failed to fetch product', 
            details: err.message 
          });
        }
        if (rowCount === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
      }
    );

    request.addParameter('id', TYPES.Int, parseInt(id));

    request.on('row', (columns) => {
      product = {};
      columns.forEach((column) => {
        product[column.metadata.colName] = column.value;
      });
      console.log('Found product:', product);
    });

    request.on('requestCompleted', () => {
      console.log('Request completed');
      connection.close();
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    });

    connection.execSql(request);
  });

  connection.connect();
}