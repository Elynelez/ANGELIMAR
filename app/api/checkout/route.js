import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-4563843805484325-090313-367a2d06d2a5814f129aabd115d3a0b1-1973378419"
})

export async function GET(req, res) {
    try {
        console.log(client)
        return NextResponse.json({ message: "puta" })
    } catch (err) {
        console.log("error")
        return NextResponse.json({ message: "xd" })
    }
};

export async function POST(req) {
    try {
        const items = await req.json()
        const body = {
            items: items.map(item => {
                return {
                    title: item.name,
                    quantity: Number(item.quantity),
                    unit_price: Number(String(item.price).replace("$", ""))*100,
                    currency_id: "COP"
                }
            }),
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending"
            },
            auto_return: "approved"
        }

        const preference = new Preference(client)
        const result = await preference.create({ body })

        return NextResponse.json({ id: result.id });
    } catch (err) {
        console.log("error:", err)
        return NextResponse.json({ message: "xd" })
    }
}