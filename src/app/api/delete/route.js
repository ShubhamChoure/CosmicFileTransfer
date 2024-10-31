import { NextResponse } from 'next/server';
import clientPromise from '@/lib/clientPromise';
import { GridFSBucket } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cosmicdata');
    const currentTime = new Date();
    const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);

    // Find all files older than 5 minutes
    const oldFiles = await db.collection('data').find({ uploadDate: { $lt: twentyFourHoursAgo } }).toArray();

    if (oldFiles.length === 0) {
      return NextResponse.json({ success: true, message: 'No files to delete' });
    }

    // Create an array of file IDs to delete from GridFS
    const fileIdsToDelete = oldFiles.map(file => file.filename);

    // Delete from fs.chunks and fs.files collections
    const bucket = new GridFSBucket(db);
    
    await Promise.all(fileIdsToDelete.map(async (filename) => {
      const fileDoc = await bucket.find({ filename }).toArray();
      if (fileDoc.length > 0) {
        await bucket.delete(fileDoc[0]._id); // Deletes the file from GridFS
      }
    }));

    // Delete entries from the data collection
    await db.collection('data').deleteMany({ uploadDate: { $lt: fiveMinutesAgo } });

    return NextResponse.json({ success: true, message: 'Old files deleted successfully' });
  } catch (error) {
    console.error('Error deleting old files:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete old files',
      details: error.message,
    }, { status: 500 });
  }
}
