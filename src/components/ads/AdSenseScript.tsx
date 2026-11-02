import Script from "next/script";

/**
 * AdSenseScript component
 * Injects Google AdSense client script ONLY when a valid Publisher ID is provided
 * via environment variables (NEXT_PUBLIC_ADSENSE_CLIENT or NEXT_PUBLIC_ADSENSE_CLIENT_ID).
 * Does not load external ad scripts if unconfigured or using placeholders.
 */
export default function AdSenseScript() {
  const clientId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (
    !clientId ||
    clientId.trim() === "" ||
    clientId === "ca-pub-0000000000000000" ||
    !clientId.startsWith("ca-pub-")
  ) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}