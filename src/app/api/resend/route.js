import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.RESEND_API_KEY;
  const hasToEmail = !!process.env.RESEND_TO_EMAIL;
  return NextResponse.json({ 
    hasKey,
    keyLength: process.env.RESEND_API_KEY?.length || 0,
    hasToEmail,
    toEmailLength: process.env.RESEND_TO_EMAIL?.length || 0
  });
}
