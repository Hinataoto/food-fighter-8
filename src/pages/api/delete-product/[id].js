import { Connection, Request, TYPES } from 'tedious';
import { dbConfig } from '../db-config';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  console.log('Deleting product with ID:', id);

  const connection = new Connection(dbConfig);

  connection.on('connect', (err) => {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ 
        error: 'Database connection failed', 
        details: err.message 
      });
    }

    console.log('Connected to database, executing delete query...');

    const request = new Request(
      'DELETE FROM [dbo].[Products] WHERE Id = @id',
      (err, rowCount) => {
        if (err) {
          console.error('Delete error:', err);
          return res.status(500).json({ 
            error: 'Failed to delete product', 
            details: err.message 
          });
        }
        if (rowCount === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
      }
    );

    request.addParameter('id', TYPES.Int, parseInt(id));

    request.on('requestCompleted', () => {
      console.log('Delete request completed');
      connection.close();
      res.status(200).json({ message: 'Product deleted successfully' });
    });

    connection.execSql(request);
  });

  connection.connect();
}