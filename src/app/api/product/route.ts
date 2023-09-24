import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/lib/db";

export async function GET() {
  try {
    const query = "SELECT * FROM products";
    const response = await conn?.query(query);
    return NextResponse.json(response?.rows);
  } catch (error: any) {
    return NextResponse.json({
      message: error
    });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const {id,name,image,price} = await request.json();
    const result = await conn?.query(`INSERT INTO products(id,image,name,price) VALUES (${id},'${image}','${name}',${price})`);
    return NextResponse.json(result?.rowCount);
  } catch (error) {
    return NextResponse.json({
      error
    });
  }
 
}