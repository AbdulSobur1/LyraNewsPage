"use client";

import { IconBell, IconBellRinging, IconBellOff } from "@tabler/icons-react";
import { useEffect, useState, useCallback } from "react";

const NOTIFICATION_STORAGE_KEY = "lyranews-notifications-enabled";
const LAST_VISIT_KEY = "lyranews-last-visit";

export function NotificationBell() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSupported("Notification" in window);

    if ("Notification" in window) {
      const stored = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
      const isEnabled = stored === "true" && Notification.permission === "granted";
      setEnabled(isEnabled);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setEnabled(true);
        localStorage.setItem(NOTIFICATION_STORAGE_KEY, "true");
        localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());

        // Send a welcome/test notification
        const notification = new Notification("🔔 LyraNews Notifications", {
          body: "You'll be notified when breaking news drops!",
          icon: "/favicon.ico",
        });
        setTimeout(() => notification.close(), 5000);
      }
    } catch {
      // Permission denied or error
    }
  }, []);

  const disableNotifications = useCallback(() => {
    setEnabled(false);
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, "false");
  }, []);

  const toggle = useCallback(() => {
    if (enabled) {
      disableNotifications();
    } else {
      requestPermission();
    }
  }, [enabled, requestPermission, disableNotifications]);

  if (!mounted) {
    return (
      <button
        className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-hairline border-[var(--border)] bg-transparent text-text-secondary"
        disabled
        aria-label="Notifications"
      >
        <IconBell className="h-4 w-4" />
      </button>
    );
  }

  if (!supported) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className={`flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border border-hairline transition-all duration-150 ${
        enabled
          ? "border-gold bg-gold-dim text-gold"
          : "border-[var(--border)] bg-transparent text-text-secondary hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
      }`}
      aria-label={enabled ? "Disable notifications" : "Enable notifications"}
      title={
        enabled
          ? "Notifications enabled — click to disable"
          : "Get notified when breaking news drops"
      }
    >
      {enabled ? (
        <IconBellRinging className="h-4 w-4" aria-hidden="true" />
      ) : (
        <IconBell className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
