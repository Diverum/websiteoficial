export const config = {
  matcher: ["/"],
};

export default function middleware(request) {
  const country = request.headers.get("x-vercel-ip-country") || "US";
  const url = new URL(request.url);

  // US → redirect to /en
  if (country === "US" && url.pathname === "/") {
    return Response.redirect(new URL("/en", request.url), 307);
  }

  // Everyone else (including CO) stays on / (Spanish by default)
  // Set cookie with detected country for client-side use
  const response = new Response(null, {
    status: 200,
    headers: {
      "x-middleware-next": "1",
      "Set-Cookie": `geo_country=${country}; Path=/; SameSite=Lax; Max-Age=86400`,
    },
  });

  return response;
}