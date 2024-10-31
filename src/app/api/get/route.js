import { NextResponse } from 'next/server';
import clientPromise from '@/lib/clientPromise';
import { GridFSBucket } from 'mongodb';

export async function POST(request) {
  try {
    const reqJson = await request.json();
    const {randomNumber} = reqJson;
    if (!randomNumber) {
      return NextResponse.json({ success: false, error: 'Missing random number' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('cosmicdata'); // Ensure this matches your database name
    const bucket = new GridFSBucket(db);

    // Find the file metadata based on the random number
    const fileData = await db.collection('data').findOne({ randomNumber });

    if (!fileData) {
      return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
    }

    const downloadStream = bucket.openDownloadStreamByName(fileData.filename);

    return new NextResponse(downloadStream, {
      headers: {
        'Content-Disposition': `attachment; filename="${fileData.originalFilename}"`, // Set the filename for download
        'Content-Type': 'application/octet-stream', // Set the content type
      },
    });
    
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to download file',
      details: error.message,
    }, { status: 500 });
  }
}
