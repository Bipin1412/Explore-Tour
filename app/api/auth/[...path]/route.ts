import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getServerAuthApiBaseUrl } from "@/lib/auth/api";

export const runtime = "nodejs";

const allowedPaths = new Set(["login", "signup", "me"]);

type MockUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  provider: "LOCAL";
  role: "USER" | "ADMIN";
};

type MockStore = {
  usersByEmail: Map<string, MockUser>;
  usersByPhone: Map<string, MockUser>;
  tokens: Map<string, string>;
};

declare global {
  // eslint-disable-next-line no-var
  var __explorerToursMockAuth: MockStore | undefined;
}

function getMockStore(): MockStore {
  if (!globalThis.__explorerToursMockAuth) {
    const adminUser: MockUser = {
      id: "mock-admin-user",
      fullName: "Test Admin",
      email: "admin@explorertours.local",
      phoneNumber: "9999999999",
      password: "Admin@12345",
      provider: "LOCAL",
      role: "ADMIN"
    };

    globalThis.__explorerToursMockAuth = {
      usersByEmail: new Map([[adminUser.email, adminUser]]),
      usersByPhone: new Map([[adminUser.phoneNumber, adminUser]]),
      tokens: new Map()
    };
  }

  return globalThis.__explorerToursMockAuth;
}

function resolvePath(segments: string[] | undefined) {
  if (!segments || segments.length !== 1) {
    return null;
  }

  const path = segments[0];
  return allowedPaths.has(path) ? path : null;
}

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

function shouldForceMock() {
  return isDevelopment() && process.env.AUTH_MOCK === "true";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePhone(phoneNumber: string) {
  return phoneNumber.replace(/\s+/g, "");
}

function isValidEmail(value: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function isValidPhoneNumber(value: string) {
  return /^[0-9]{10,15}$/.test(value);
}

function buildAuthResponse(user: MockUser) {
  const token = `mock-${randomUUID()}`;
  const store = getMockStore();
  store.tokens.set(token, user.id);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      provider: user.provider,
      role: user.role
    }
  };
}

function authError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

async function handleMockSignup(request: Request) {
  let payload: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
  };

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return authError("Invalid request body.");
  }

  const fullName = (payload.fullName ?? "").trim();
  const email = normalizeEmail(payload.email ?? "");
  const phoneNumber = normalizePhone(payload.phoneNumber ?? "");
  const password = payload.password ?? "";
  const confirmPassword = payload.confirmPassword ?? "";

  if (fullName.length < 2 || fullName.length > 120) {
    return authError("Full name must be between 2 and 120 characters");
  }

  if (!isValidEmail(email)) {
    return authError("Enter a valid email address");
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return authError("Phone number must contain 10 to 15 digits");
  }

  if (password.length < 8 || password.length > 80) {
    return authError("Password must be between 8 and 80 characters");
  }

  if (!confirmPassword) {
    return authError("Confirm password is required");
  }

  if (password !== confirmPassword) {
    return authError("Passwords do not match.");
  }

  const store = getMockStore();
  if (store.usersByEmail.has(email)) {
    return authError("Email is already registered.");
  }

  if (store.usersByPhone.has(phoneNumber)) {
    return authError("Phone number is already registered.");
  }

  const user: MockUser = {
    id: randomUUID(),
    fullName,
    email,
    phoneNumber,
    password,
    provider: "LOCAL",
    role: "USER"
  };

  store.usersByEmail.set(email, user);
  store.usersByPhone.set(phoneNumber, user);

  return NextResponse.json(buildAuthResponse(user), { status: 201 });
}

async function handleMockLogin(request: Request) {
  let payload: { email?: string; password?: string };

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return authError("Invalid request body.");
  }

  const email = normalizeEmail(payload.email ?? "");
  const password = payload.password ?? "";

  if (!email || !password) {
    return authError("Invalid email or password.", 401);
  }

  const store = getMockStore();
  const user = store.usersByEmail.get(email);

  if (!user) {
    return authError("Invalid email or password.", 401);
  }

  if (user.password !== password) {
    return authError("Invalid email or password.", 401);
  }

  return NextResponse.json(buildAuthResponse(user));
}

function handleMockMe(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return authError("Authentication is required.", 401);
  }

  const token = authorization.slice(7).trim();
  if (!token) {
    return authError("Authentication is required.", 401);
  }

  const store = getMockStore();
  const userId = store.tokens.get(token);
  if (!userId) {
    return authError("Authentication is required.", 401);
  }

  const user = Array.from(store.usersByEmail.values()).find((candidate) => candidate.id === userId);
  if (!user) {
    return authError("Authentication is required.", 401);
  }

  return NextResponse.json({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    provider: user.provider,
    role: user.role
  });
}

async function handleMockAuth(request: Request, path: string) {
  if (path === "signup") {
    return handleMockSignup(request);
  }

  if (path === "login") {
    return handleMockLogin(request);
  }

  if (path === "me") {
    return handleMockMe(request);
  }

  return NextResponse.json({ error: "Not found." }, { status: 404 });
}

function buildUnreachableResponse(error: unknown) {
  const details = error instanceof Error ? error.message : "Unknown error";
  const errorMessage = isDevelopment()
    ? `Auth service unreachable: ${details}`
    : "Auth service unavailable.";

  return NextResponse.json({ error: errorMessage }, { status: 502 });
}

async function proxyAuthRequest(request: Request, path: string) {
  const baseUrl = getServerAuthApiBaseUrl();
  const url = `${baseUrl}/api/auth/${path}`;

  const headers = new Headers();
  const authorization = request.headers.get("authorization");
  if (authorization) {
    headers.set("authorization", authorization);
  }

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store"
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const response = await fetch(url, init);
  const responseBody = await response.text();

  const responseHeaders = new Headers();
  const responseContentType = response.headers.get("content-type");
  if (responseContentType) {
    responseHeaders.set("content-type", responseContentType);
  }

  const responseAuthorization = response.headers.get("authorization");
  if (responseAuthorization) {
    responseHeaders.set("authorization", responseAuthorization);
  }

  return new NextResponse(responseBody, {
    status: response.status,
    headers: responseHeaders
  });
}

async function handleAuthRequest(request: Request, path: string) {
  if (shouldForceMock()) {
    return handleMockAuth(request, path);
  }

  const fallbackRequest = isDevelopment() ? request.clone() : null;

  try {
    return await proxyAuthRequest(request, path);
  } catch (error) {
    if (isDevelopment() && fallbackRequest) {
      return handleMockAuth(fallbackRequest, path);
    }

    return buildUnreachableResponse(error);
  }
}

export async function GET(request: Request, context: { params: { path?: string[] } }) {
  const path = resolvePath(context.params.path);
  if (!path) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return handleAuthRequest(request, path);
}

export async function POST(request: Request, context: { params: { path?: string[] } }) {
  const path = resolvePath(context.params.path);
  if (!path) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return handleAuthRequest(request, path);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
