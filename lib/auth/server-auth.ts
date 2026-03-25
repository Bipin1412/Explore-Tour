import { extractBearerToken, fetchCurrentUser, getServerAuthApiBaseUrl } from "@/lib/auth/api";
import { AuthUser } from "@/types/auth";

type MockStore = {
  usersByEmail: Map<string, AuthUser & { password?: string }>;
  tokens: Map<string, string>;
};

const globalForMock = globalThis as unknown as { __explorerToursMockAuth?: MockStore };

function getMockUserFromToken(token: string) {
  const store = globalForMock.__explorerToursMockAuth;
  if (!store) {
    return null;
  }

  const userId = store.tokens.get(token);
  if (!userId) {
    return null;
  }

  const user = Array.from(store.usersByEmail.values()).find((candidate) => candidate.id === userId);
  return user ?? null;
}

export async function authenticateRequest(request: Request) {
  const token = extractBearerToken(request.headers.get("Authorization"));
  if (!token) {
    return null;
  }

  if (token.startsWith("mock-")) {
    const user = getMockUserFromToken(token);
    return user ? { token, user } : null;
  }

  const user = await fetchCurrentUser(token, getServerAuthApiBaseUrl());
  if (!user) {
    return null;
  }

  return { token, user };
}
