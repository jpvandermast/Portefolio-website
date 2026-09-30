import { createHash } from 'node:crypto';

/** IP van de bezoeker zoals Vercel het doorgeeft. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/** ip_hash = SHA-256(ip + CHAT_IP_SALT); het IP-adres zelf wordt nooit opgeslagen. */
export function hashIp(ip: string): string {
  const salt = process.env.CHAT_IP_SALT;
  if (!salt) throw new Error('CHAT_IP_SALT ontbreekt');
  return createHash('sha256').update(ip + salt).digest('hex');
}
