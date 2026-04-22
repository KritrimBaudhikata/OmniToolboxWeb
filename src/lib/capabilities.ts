export const WEB_FALLBACKS = {
  iap: "In-app purchases are disabled on web. Use external support/contact links instead.",
  ads: "App-open and mobile ad SDK behaviors are disabled on web.",
  camera: "Camera-dependent flows require browser permission and may be unavailable on restricted devices.",
  fileSystem: "Native file-system access is replaced with browser download/upload APIs where possible.",
  notifications: "Push/local notification features are not enabled in this initial web release.",
} as const;
