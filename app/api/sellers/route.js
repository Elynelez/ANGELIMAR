import { NextResponse } from 'next/server'
import clientPromise from '../../components/DataBase/mongodb.js'
import { ObjectId } from 'mongodb';

export async function GET() {
    const result = await clientPromise
    const db = result.db('test')
    const collection = await db.collection('girls')

    const girls = await collection.find({}).toArray()
    return NextResponse.json(girls)
}

export async function POST(req) {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('girls');

    const documentId = data._id

    const newComment = data.comments

    await collection.updateOne(
        { _id: new ObjectId(documentId) },
        { $push: { comments: newComment.reverse()[0] } }
    );

    return NextResponse.json({ message: "postureo" })
}