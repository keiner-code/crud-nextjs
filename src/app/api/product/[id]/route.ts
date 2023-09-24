import { conn } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const query = `SELECT * FROM products WHERE id = ${id}`;
    const response = await conn?.query(query);
    return NextResponse.json(response?.rows[0]);
  } catch (error: any) {
    return NextResponse.json({
      message: error,
    });
  }
}

export async function PUT(request: NextRequest, {params}: Params) {
  try {
    const { id } = params;
    const {name, image, price} = await request.json();
    const query = `UPDATE products SET name='${name}',image='${image}',price=${price} WHERE id = ${id}`;
    const response = await conn?.query(query);
    return NextResponse.json(response?.rowCount);
  } catch (error: any) {
    new Error('Error: ', error);
  }
}

export async function DELETE(request: NextRequest, {params}: Params) {
  const {id} = params;
  const response = await conn?.query(`DELETE FROM products WHERE id = ${id}`);
  return NextResponse.json(response?.rowCount)
}
