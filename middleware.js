export const config = {
  matcher: ["/", "/en", "/en/:path*", "/privacy", "/terms", "/about"],
};

const GEO_COOKIE_OPTIONS = "Path=/; SameSite=Lax; Max-Age=3600";

function detectSupportedCountry(request) {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  return country.toUpperCase() === "US" ? "US" : "CO";
}

function toEnglishPath(pathname) {
  if (pathname === "/" || pathname === "") return "/en";
  if (pathname.startsWith("/en")) return pathname;
  return `/en${pathname}`;
}

function toSpanishPath(pathname) {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
  return pathname || "/";
}

function withGeoCookies(response, country) {
  response.headers.append("Set-Cookie", `geo_country=${country}; ${GEO_COOKIE_OPTIONS}`);
  response.headers.append("Set-Cookie", `geo_source=edge; ${GEO_COOKIE_OPTIONS}`);
  return response;
}

function nextResponse(country) {
  return withGeoCookies(
    new Response(null, {
      status: 200,
      headers: { "x-middleware-next": "1" },
    }),
    country
  );
}

function redirectResponse(url, country) {
  return withGeoCookies(
    new Response(null, {
      status: 307,
      headers: { Location: url.toString() },
    }),
    country
  );
}

export default function middleware(request) {
  const country = detectSupportedCountry(request);
  const url = new URL(request.url);
  const isEnglishPath = url.pathname === "/en" || url.pathname.startsWith("/en/");

  if (country === "US" && !isEnglishPath) {
    url.pathname = toEnglishPath(url.pathname);
    return redirectResponse(url, country);
  }

  if (country !== "US" && isEnglishPath) {
    url.pathname = toSpanishPath(url.pathname);
    return redirectResponse(url, country);
  }

  return nextResponse(country);
}
