import { NextResponse } from 'next/server'
import { authClient } from './lib/auth-client';
import { auth } from './lib/auth';
 
export async function proxy(request) {

      const session = await auth.api.getSession({
    headers: request.headers,
  });

  if(!session){
    return NextResponse.redirect(new URL('/signin', request.url))
  }

}
 
export const config = {
  matcher: ['/addidea', '/ideas/:path'],
}