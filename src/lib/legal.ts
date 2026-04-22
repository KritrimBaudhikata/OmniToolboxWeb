export const APP_CONFIG = {
  appName: "OmniToolbox",
  tagline: "All-in-One Everyday Toolbox",
  developerEmailOrUrl: "kritirim.baudhikta@gmail.com",
  website: "https://kritrimbaudhikata.com/omni-toolkit",
  donationUrl: "",
  paypalUrl: "https://paypal.me/Azmarta",
  supportTiers: [
    { label: "Buy a Coffee – $1", amount: 1, url: "" },
    { label: "Support the Project – $5", amount: 5, url: "" },
    { label: "Big Support – $10", amount: 10, url: "" },
    { label: "Super Support – $20", amount: 20, url: "" },
    { label: "Mega Support – $50", amount: 50, url: "" },
  ],
  privacyPolicyUrl: "https://kritrimbaudhikata.com/omni-toolkit/privacy-policy",
  termsUrl: "https://kritrimbaudhikata.com/omni-toolkit/terms-and-conditions",
  feedbackUrl: "https://forms.gle/JMBGqL9X9CT1pEVU8",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.omni-toolkit.app",
  appStoreUrl: "https://apps.apple.com/app/omni-toolkit/id6764644906",
} as const;

export const PRIVACY_POLICY_TITLE = "Privacy Policy";
export const PRIVACY_LAST_UPDATED = "March 4, 2026";
export const PRIVACY_POLICY_SECTIONS = [
  {
    title: "1. Information We Collect",
    body: 'This Privacy Policy describes how we handle information in the OmniToolbox mobile application (the "App"). We are committed to protecting your privacy and ensuring that your experience with our tools is secure and transparent.\n\nThe App is designed as an "offline-first" utility.\n\n• Personal Data: We do not require you to create an account, provide an email address, or share your name to use the App.\n\n• User Input Data: Data you enter into tools—such as text for the JSON Formatter, passwords generated, or values for the Unit Converter—is processed locally on your device. We do not intentionally upload that content to our servers as part of the tool\'s normal functionality. If you use optional external links, support forms, crash reporting, or analytics-enabled builds, limited technical data may be processed by those services as described below.\n\n• Automatically Collected Data: If we use third-party services (like Expo or Google Analytics for Firebase), they may collect non-identifying technical data such as device type, OS version, and app crashes to help us improve performance.',
  },
  {
    title: "2. Device Permissions",
    body: 'To provide full functionality, the App may request the following permissions:\n\n• Camera: Required solely for the QR Code Scanner (if applicable) to capture images of codes. We do not store photos or video.\n\n• Clipboard: Required to allow you to "Copy" generated passwords, formatted text, or "Paste" content into the App for processing.\n\n• Photos/Media access, where requested, is used only when you explicitly choose to save or select content. Where supported, the App uses platform-provided pickers and limited-access mechanisms to minimize access to device media.',
  },
  {
    title: "3. Data Processing and Security",
    body: '• Local Processing: 100% of the logic for the Password Generator, Case Converter, and other tools happens in your device\'s RAM. Most working data is processed locally in memory during active use. Data may remain on your device if you save it, copy it to the clipboard, or enable optional local history features.\n\n• Optional History: If you enable them in Settings, we store a limited history on your device only: the last 10 copied passwords (encrypted with the device keychain) and the last 5 QR codes or saved images. You can disable these at any time.\n\n• Encryption: For tools like the Password Generator, we use standard cryptographic libraries to ensure randomness. We do not have a "backdoor" to see the passwords you generate.',
  },
  {
    title: "4. Third-Party Services",
    body: "We may use the following third-party services which have their own privacy policies:\n\n• Google Play Services / Apple App Store: For app distribution and basic analytics.\n\n• In-App Purchases: Optional support purchases (e.g. \"Buy a Coffee\") are processed entirely by Apple (App Store) or Google (Play Store). Payment and billing data are handled by the store; we do not receive your payment details. The store may share with us non-sensitive transaction information (e.g. that a purchase completed) for support and accounting purposes.\n\n• Expo: To facilitate app updates and cross-platform performance.\n\n• Links: The app may link to external sites (e.g. feedback form, donation page). Those sites have their own privacy policies. We do not control data you submit there.",
  },
  {
    title: "5. Your Rights (GDPR / CCPA)",
    body: 'Since we do not collect personal identifiers or store your data on our servers, there is no data for us to "delete" or "export" upon request. You have full control over your data by simply clearing the App\'s cache or uninstalling the App.',
  },
  {
    title: "6. Changes to This Policy",
    body: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
  },
  {
    title: "7. Contact Us",
    body: "If you have any questions about this Privacy Policy, please contact us via the feedback form linked in the app Settings, or at kritirim.baudhikta@gmail.com.",
  },
];

export const TERMS_TITLE = "Terms of Service";
export const TERMS_LAST_UPDATED = "March 4, 2026";
export const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: 'By downloading or using the OmniToolbox app ("the App"), you agree to be bound by these Terms. If you do not agree, do not use the App.',
  },
  {
    title: "2. License & Scope",
    body: "We grant you a personal, non-exclusive, non-transferable, revocable license to use the App for personal or professional utility purposes. You may not reverse engineer, decompile, or attempt to extract the source code of the App.",
  },
  {
    title: "3. Tool-Specific Disclaimers",
    body: "• Password Generator: While we use standard cryptographic methods for randomness, you are solely responsible for the security and storage of your passwords. We are not liable for any security breaches resulting from generated passwords.\n\n• Unit Converter / Calculators: Results are for informational purposes. While we strive for accuracy, we do not warrant the absolute precision of conversions.",
  },
  {
    title: "4. Intellectual Property",
    body: "The App's design, branding, and original code are the exclusive property of Kritrim Baudhikata. You may not use our brand assets without prior written consent.",
  },
  {
    title: "5. Age suitability",
    body: "The App is intended for a general audience utility use case. If you are below the age required to consent to app usage in your jurisdiction, please use the App with the involvement of a parent or guardian where required by law.",
  },
  {
    title: "6. Limitation of Liability",
    body: 'The App is provided "As Is." To the maximum extent permitted by law, Kritrim Baudhikata shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the App.',
  },
  {
    title: "7. Governing Law",
    body: "These terms are governed by the laws of Hong Kong SAR.",
  },
];
