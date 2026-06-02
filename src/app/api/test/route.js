import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Basic test to see if Supabase is connected
    const { data, error } = await supabaseAdmin.from('orders').select('id').limit(1);

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Backend is running, but Supabase connection failed.',
        details: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Backend is running per!',
      database: 'Supabase connection successful.',
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: 'An unexpected error occurred.',
      details: err.message
    }, { status: 500 });
  }
}
