import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export const config = {
  runtime: 'edge',
};


export default async function upload(request: NextRequest) {
  const form = await request.formData();
  const file = form.get('file') as File;
  const blob = await put(uuidv4(), file, { access: 'public' });
  console.log(blob);

  return NextResponse.json(blob);
}
