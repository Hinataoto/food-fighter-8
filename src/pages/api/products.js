import { Connection, Request, TYPES } from 'tedious';
import { dbConfig } from './db-config';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const connection = new Connection(dbConfig);

  connection.on('connect', (err) => {
    if (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    console.log('Connected to database');
    executeInsert(connection, req, res);
  });

  connection.connect();
}

function executeInsert(connection, req, res) {
  const { name, price, expiryDate, imageUrl } = req.body;

  const request = new Request(
    `INSERT INTO [dbo].[Products] (Name, Price, ExpiryDate, ImageUrl) 
     VALUES (@name, @price, @expiryDate, @imageUrl)`,
    (err) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Failed to insert product' });
      }
    }
  );

  request.addParameter('name', TYPES.NVarChar, name);
  request.addParameter('price', TYPES.Int, parseInt(price));
  request.addParameter('expiryDate', TYPES.DateTime, new Date(expiryDate));
  request.addParameter('imageUrl', TYPES.NVarChar, imageUrl);

  request.on('requestCompleted', () => {
    console.log('Product inserted successfully');
    connection.close();
    res.status(201).json({ message: 'Product created successfully' });
  });

  connection.execSql(request);
}