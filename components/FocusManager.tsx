"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function FocusManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Focus management for route changes
    const handleRouteChange = () => {
      // Find the first focusable element or the main content
      const mainContent = document.getElementById("main-content");
      const firstHeading = document.querySelector("h1");
      const firstFocusable = document.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;

      // Priority: main content > first heading > first focusable element
      const elementToFocus = mainContent || firstHeading || firstFocusable;
      
      if (elementToFocus) {
        // Add tabindex if element isn't naturally focusable
        if (!elementToFocus.hasAttribute("tabindex") && elementToFocus.tagName !== "BUTTON" && elementToFocus.tagName !== "A") {
          elementToFocus.setAttribute("tabindex", "-1");
        }
        
        elementToFocus.focus();
        
        // Remove outline for mouse users
        elementToFocus.style.outline = "none";
        
        // Restore outline for keyboard users
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            elementToFocus.style.outline = "";
            elementToFocus.removeEventListener("keydown", handleKeyDown);
          }
        };
        
        elementToFocus.addEventListener("keydown", handleKeyDown);
      }

      // Announce page change to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Navigated to ${document.title}`;
      
      document.body.appendChild(announcement);
      
      // Clean up announcement after screen readers have processed it
      setTimeout(() => {
        if (announcement.parentNode) {
          announcement.parentNode.removeChild(announcement);
        }
      }, 1000);
    };

    // Small delay to ensure DOM is ready
    setTimeout(handleRouteChange, 100);
  }, [pathname]);

  return null;
}