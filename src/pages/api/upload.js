import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // アップロードディレクトリの作成
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // formidableの設定
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB制限
    });

    // ファイルの解析と保存
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file;
    if (!file) {
      throw new Error('No file uploaded');
    }

    // ファイル名を安全な形式に変換
    const fileName = `${Date.now()}-${path.basename(file[0].newFilename)}`;
    const newPath = path.join(uploadDir, fileName);
    
    // ファイルの移動
    await fs.promises.rename(file[0].filepath, newPath);

    // 相対パスのURLを返す
    const imageUrl = `/uploads/${fileName}`;
    
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}