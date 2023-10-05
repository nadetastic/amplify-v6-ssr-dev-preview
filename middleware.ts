import { runWithAmplifyServerContext } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  // If authenticated
  if (authenticated) {  
    // Don't show the home/sign in page 
    if( request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dash', request.url));
    }
    // Don't show the sign up page
    if(request.nextUrl.pathname === '/sign-up'){
      return NextResponse.redirect(new URL('/dash', request.url));
    }
    
  }

  // if not authenticated
  if (!authenticated){

    // Don't show dash page
    if(request.nextUrl.pathname.startsWith('/dash')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow other requests if the above don't match
  return response 
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};