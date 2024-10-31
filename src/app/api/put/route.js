import { NextResponse } from 'next/server';
import clientPromise from '@/lib/clientPromise';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

const generateUniqueRandomNumber = async (db) => {
  let randomNumber;
  let isUnique = false;

  while (!isUnique) {
    randomNumber = Math.floor(100000 + Math.random() * 900000);
    const existing = await db.collection('data').findOne({ randomNumber });
    isUnique = !existing;
  }

  return randomNumber;
};

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('cosmicdata'); // Make sure this matches your database name
    const bucket = new GridFSBucket(db);

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileStream = Readable.from(Buffer.from(fileBuffer));

    const currentDateTime = new Date();
    const randomNumber = await generateUniqueRandomNumber(db);
    const uniqueFilename = `${randomNumber}-${file.name}`;

    const uploadStream = bucket.openUploadStream(uniqueFilename, {
      metadata: {
        originalFilename: file.name,
        uploadDate: currentDateTime,
        randomNumber: randomNumber,
      },
    });

    await new Promise((resolve, reject) => {
      fileStream.pipe(uploadStream)
        .on('error', (error) => {
          console.error('Stream error:', error);
          reject(error);
        })
        .on('finish', resolve);
    });

    const fileData = {
      filename: uniqueFilename,
      originalFilename: file.name,
      uploadDate: currentDateTime,
      randomNumber: randomNumber,
    };

    await db.collection('data').insertOne(fileData);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      fileData: {
        filename: file.name,
        uploadDate: currentDateTime,
        randomNumber: randomNumber,
      },
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to upload file',
      details: error.message,
    }, { status: 500 });
  }
}
