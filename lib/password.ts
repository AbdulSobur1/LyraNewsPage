import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Hash a password using scrypt with a random salt.
 * Returns a string in the format "salt:hash" (both hex-encoded).
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a password against a "salt:hash" string produced by hashPassword.
 */
export async function verifyPassword(
  password: string,
  hashed: string,
): Promise<boolean> {
  const [salt, key] = hashed.split(":");
  if (!salt || !key) return false;

  const derivedKey = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const derivedBuffer = Buffer.from(derivedKey);

  if (keyBuffer.length !== derivedBuffer.length) return false;

  return timingSafeEqual(keyBuffer, derivedBuffer);
}
