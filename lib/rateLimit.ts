import { NextRequest } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export const defaultRateLimit: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per 15 minutes
};

export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = defaultRateLimit
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  const clientIP = getClientIP(request);
  const now = Date.now();
  const key = `${clientIP}:contact`;

  // Clean up expired entries
  if (store[key] && now > store[key].resetTime) {
    delete store[key];
  }

  // Initialize or get current count
  if (!store[key]) {
    store[key] = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }

  const current = store[key];
  
  if (current.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: current.resetTime,
    };
  }

  // Increment count
  current.count++;

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - current.count,
    resetTime: current.resetTime,
  };
}

function getClientIP(request: NextRequest): string {
  // Try to get IP from various headers (for different hosting environments)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback - return unknown if no IP found
  return "unknown";
}