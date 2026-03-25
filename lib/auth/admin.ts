import { AuthUser } from "@/types/auth";

function getConfiguredAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isAdminUser(user: Pick<AuthUser, "email" | "role">) {
  if (user.role.trim().toUpperCase() === "ADMIN") {
    return true;
  }

  const adminEmails = getConfiguredAdminEmails();
  return adminEmails.has(user.email.trim().toLowerCase());
}

export function getAdminAccessErrorMessage() {
  return process.env.ADMIN_EMAILS?.trim()
    ? "Your account does not have admin access."
    : "Admin access is not configured. Add ADMIN_EMAILS to enable the admin panel.";
}
