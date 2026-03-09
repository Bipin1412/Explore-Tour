import { extractBearerToken, fetchCurrentUser, getServerAuthApiBaseUrl } from "@/lib/auth/api";

export async function authenticateRequest(request: Request) {
  const token = extractBearerToken(request.headers.get("Authorization"));
  if (!token) {
    return null;
  }

  const user = await fetchCurrentUser(token, getServerAuthApiBaseUrl());
  if (!user) {
    return null;
  }

  return { token, user };
}
