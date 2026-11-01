import Script from "next/script";

/**
 * AdSenseScript component
 * Injects Google AdSense client script ONLY when a valid Publisher ID is provided
 * in environment variables (NEXT_PUBLIC_ADSENSE_CLIENT_ID).
 * Does not load any tracking or external scripts if unconfigured.
 */
export default function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId || clientId.trim() === "" || clientId === "ca-pub-0000000000000000") {
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
