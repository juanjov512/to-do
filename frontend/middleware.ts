// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/auth"];

// Rutas protegidas que requieren autenticación
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  
  // Obtener la cookie del token
  const cookieHeader = req.headers.get('cookie') || '';
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  
  const { pathname } = req.nextUrl;

  // Si la ruta es una API, permitir el acceso
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Si la ruta es pública, permitir el acceso
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    // Si el usuario ya está autenticado y está intentando acceder a una ruta pública,
    // redirigir al dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Si la ruta es protegida y no hay token, redirigir al login
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = new URL("/auth", req.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - api (API routes)
    // - static (static files)
    '/((?!_next/static|_next/image|favicon.ico|api/auth|static|.*\..*).*)',
  ],
};
