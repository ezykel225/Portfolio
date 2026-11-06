import { Redis } from '@upstash/redis'

/**
 * The Upstash connection, or null when the site is running without one.
 *
 * The live counter is the only thing that needs Redis, and it is a nicety
 * rather than content. If the credentials are absent — a local checkout,
 * a preview build, the integration removed — everything else must still
 * work, so this returns null and the API answers "unavailable" instead of
 * throwing.
 *
 * Vercel's Upstash integration injects the KV_* names; a hand-made Upstash
 * database uses the UPSTASH_* ones. Both are accepted so the site does not
 * care how the database was provisioned.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

export const redis = url && token ? new Redis({ url, token }) : null
