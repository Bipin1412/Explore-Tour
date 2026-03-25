import { AuthUser } from "@/types/auth";

const DEFAULT_AUTH_API_BASE_URL = "http://localhost:8080";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function getAuthBackendBaseUrl() {
  return trimTrailingSlash(
    process.env.AUTH_API_BASE_URL ??
      process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ??
      DEFAULT_AUTH_API_BASE_URL
  );
}

export function getAuthApiBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return trimTrailingSlash(envUrl);
  }

  return "";
}

export function getServerAuthApiBaseUrl() {
  return getAuthBackendBaseUrl();
}

export function getGoogleAuthUrl() {
  return `${getAuthBackendBaseUrl()}/oauth2/authorization/google`;
}

export function extractBearerToken(authorizationHeader: string | null) {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorizationHeader.slice(7).trim();
  return token.length > 0 ? token : null;
}

export async function fetchCurrentUser(token: string, baseUrl = getAuthApiBaseUrl()) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as AuthUser;
  } catch {
    return null;
  }
}
