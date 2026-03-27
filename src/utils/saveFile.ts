import fs from 'fs';
import path from 'path';

export const saveToDisk = (buffer: Buffer, filename: string): string => {
  const uploadPath = path.join(process.cwd(), 'src/public/uploads');

  // Buat folder kalau belum ada
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  fs.writeFileSync(path.join(uploadPath, filename), buffer);

  return filename;
};
