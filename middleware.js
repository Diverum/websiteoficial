// middleware.js
export const config = {
  matcher: ["/"],
};

const SPANISH_COUNTRIES = [
  "CO", "MX", "ES", "CL", "PE", "AR", "EC",
  "VE", "BO", "PY", "UY", "CR", "PA", "DO",
  "GT", "HN", "SV", "NI", "CU", "PR",
];

export default function middleware(request) {
  const country = request.headers.get("x-vercel-ip-country") || "US";
  const url = new URL(request.url);

  // Si es US y está en /, redirigir a /en
  if (country === "US" && url.pathname === "/") {
    return Response.redirect(new URL("/en", request.url), 307);
  }

  // Guardar país detectado en cookie para uso client-side
  const response = new Response(null, {
    status: 200,
    headers: {
      "x-middleware-next": "1",
      "Set-Cookie": `geo_country=${country}; Path=/; SameSite=Lax; Max-Age=86400`,
    },
  });

  return response;
}