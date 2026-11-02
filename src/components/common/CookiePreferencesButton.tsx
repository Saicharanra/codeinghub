"use client";

import React from "react";

export default function CookiePreferencesButton({
  className = "hover:text-[#176B50] transition-colors text-left",
}: {
  className?: string;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("codinghub_reopen_cookie_consent"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label="Manage cookie and privacy consent preferences"
    >
      Cookie Preferences
    </button>
  );
}