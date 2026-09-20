import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { User, LogIn, LogOut, Sparkles } from "lucide-react";

export const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_cG9zc2libGUtdHVuYS0yMzY2LmNsZXJrLmFjY291bnRzLmRldiQ";

export interface ClerkUser {
  id: string;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string;
  primaryEmailAddress?: { emailAddress: string } | null;
  username?: string | null;
}

interface ClerkContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: ClerkUser | null;
  openSignIn: () => void;
  openSignUp: () => void;
  openUserProfile: () => void;
  signOut: () => Promise<void>;
}

const ClerkContext = createContext<ClerkContextType>({
  isLoaded: false,
  isSignedIn: false,
  user: null,
  openSignIn: () => {},
  openSignUp: () => {},
  openUserProfile: () => {},
  signOut: async () => {},
});

declare global {
  interface Window {
    Clerk?: any;
  }
}

// Global Clerk Dark Theme Styling injection with full contrast on all buttons and uploaders
function injectClerkDarkStyles() {
  const styleId = "clerk-dark-custom-overrides";
  let style = document.getElementById(styleId) as HTMLStyleElement;
  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }

  style.innerHTML = `
    /* Modal & Card Dark Background */
    .cl-rootBox,
    .cl-card,
    .cl-modalContent,
    .cl-userProfile-root,
    .cl-userProfileNavbar,
    .cl-pageScrollBox,
    .cl-scrollBox {
      background-color: #080d16 !important;
      color: #ffffff !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 1.5rem !important;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85) !important;
    }

    /* All text inside Profile modal default to white */
    .cl-userProfile-root p,
    .cl-userProfile-root span,
    .cl-userProfile-root h1,
    .cl-userProfile-root h2,
    .cl-userProfile-root h3,
    .cl-userProfile-root h4,
    .cl-userProfile-root label,
    .cl-profileSectionTitleText,
    .cl-headerTitle,
    .cl-modalHeaderTitle,
    .cl-identityPreviewText {
      color: #ffffff !important;
    }

    .cl-headerSubtitle,
    .cl-dividerText,
    .cl-footerActionText,
    .cl-profileSectionSubtitleText,
    .cl-formFieldDescription,
    .cl-helpText,
    .cl-breadcrumbsItem {
      color: rgba(255, 255, 255, 0.6) !important;
    }

    /* =========================================================
       FIX UPLOAD BUTTON & SECONDARY BUTTONS IN PROFILE
       ========================================================= */
    .cl-avatarImageUploadButton,
    .cl-fileDropAreaButton,
    .cl-avatarUploader,
    button[data-localization-key*="uploadImage"],
    button[data-localization-key*="upload"],
    .cl-button__secondary,
    .cl-menuButton {
      background-color: #121a29 !important;
      color: #ffffff !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 0.5rem !important;
      font-weight: 600 !important;
      transition: all 0.2s ease !important;
    }

    .cl-avatarImageUploadButton:hover,
    .cl-fileDropAreaButton:hover,
    .cl-button__secondary:hover {
      background-color: #1a263c !important;
      border-color: rgba(193, 39, 45, 0.5) !important;
      color: #ffffff !important;
    }

    /* Cancel & Action buttons */
    .cl-formButtonReset {
      color: rgba(255, 255, 255, 0.7) !important;
      background: transparent !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      border-radius: 0.5rem !important;
      padding: 0.4rem 0.8rem !important;
    }
    .cl-formButtonReset:hover {
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.08) !important;
    }

    /* Social Buttons (Google, Apple, etc.) */
    .cl-socialButtonsBlockButton {
      background-color: #121a29 !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      color: #ffffff !important;
      border-radius: 0.75rem !important;
      transition: all 0.2s ease !important;
    }

    .cl-socialButtonsBlockButtonText {
      color: #ffffff !important;
      font-weight: 600 !important;
    }

    .cl-socialButtonsBlockButton:hover {
      background-color: #1a263c !important;
      border-color: rgba(193, 39, 45, 0.5) !important;
    }

    /* Keep social icons natural with transparent backgrounds */
    .cl-socialButtonsProviderIcon,
    .cl-socialButtonsBlockButton__google img,
    .cl-socialButtonsBlockButton__apple img {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }

    /* Apple logo white fill */
    .cl-socialButtonsBlockButton__apple svg,
    .cl-socialButtonsBlockButton[data-provider="apple"] svg {
      fill: #ffffff !important;
      color: #ffffff !important;
    }
    .cl-socialButtonsBlockButton__apple svg path,
    .cl-socialButtonsBlockButton[data-provider="apple"] svg path {
      fill: #ffffff !important;
    }

    /* =========================================================
       COMPLETELY HIDE & DELETE API KEYS FROM USER PROFILE MODAL
       ========================================================= */
    [data-localization-key*="apiKeys"],
    [data-localization-key*="apiKey"],
    [data-tab-id*="api-key"],
    [data-tab-id*="apiKeys"],
    button[data-localization-key="userProfile.navbar.apiKeys"],
    a[data-localization-key="userProfile.navbar.apiKeys"],
    .cl-navbarButton[data-localization-key*="apiKeys"],
    .cl-userProfileNavbar__apiKeys,
    .cl-profileSection__apiKeys,
    .cl-apiKeysPage {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      pointer-events: none !important;
    }

    /* Navbar items styling in User Profile */
    .cl-navbarButton {
      color: rgba(255, 255, 255, 0.7) !important;
      border-radius: 0.75rem !important;
    }
    .cl-navbarButton:hover {
      background-color: rgba(255, 255, 255, 0.05) !important;
      color: #ffffff !important;
    }
    .cl-navbarButton[data-active="true"],
    .cl-navbarButton:focus {
      background-color: rgba(193, 39, 45, 0.15) !important;
      color: #C1272D !important;
    }

    /* Action Links (+ Add email address, + Connect account, Update username) */
    .cl-profileSectionAction,
    .cl-profileSectionItemAction,
    .cl-profileSectionPrimaryButton,
    .cl-formFieldActionLink,
    .cl-accordionTriggerButton {
      color: #C1272D !important;
      font-weight: 600 !important;
      transition: color 0.2s ease !important;
    }
    .cl-profileSectionAction:hover,
    .cl-profileSectionPrimaryButton:hover,
    .cl-formFieldActionLink:hover {
      color: #ff4d54 !important;
    }

    /* Form Fields Inputs */
    .cl-formFieldLabel {
      color: rgba(255, 255, 255, 0.8) !important;
      font-weight: 500 !important;
    }

    .cl-formFieldInput {
      background-color: #0e1626 !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      color: #ffffff !important;
      border-radius: 0.75rem !important;
    }

    .cl-formFieldInput:focus {
      border-color: #C1272D !important;
      box-shadow: 0 0 0 2px rgba(193, 39, 45, 0.25) !important;
    }

    /* Save / Primary Buttons */
    .cl-formButtonPrimary {
      background-color: #C1272D !important;
      color: #ffffff !important;
      border-radius: 0.5rem !important;
      font-weight: 700 !important;
      transition: all 0.2s ease !important;
    }

    .cl-formButtonPrimary:hover {
      background-color: #d92d34 !important;
      box-shadow: 0 4px 15px rgba(193, 39, 45, 0.4) !important;
    }

    /* Links */
    .cl-footerActionLink {
      color: #C1272D !important;
      font-weight: 600 !important;
    }

    /* =========================================================
       AVATAR / PROFILE PICTURE UPLOAD BUTTON - white text fix
       ========================================================= */
    .cl-avatarImageUploadButton,
    .cl-avatarImageActions > button,
    .cl-avatarImageActions a,
    .cl-avatarImageActionsUpload,
    .cl-avatarBox button,
    .cl-userPreviewAvatarBox button,
    .cl-fileDropAreaButton,
    .cl-fileDropAreaButtonPrimary,
    [class*="cl-avatar"] button,
    [class*="cl-avatar"] a,
    [class*="avatarUpload"],
    [class*="imageUpload"] {
      color: #ffffff !important;
      background-color: #1a263c !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 0.5rem !important;
      font-weight: 600 !important;
    }

    [class*="cl-avatar"] button:hover,
    .cl-avatarImageUploadButton:hover,
    .cl-fileDropAreaButton:hover {
      background-color: #243350 !important;
      color: #ffffff !important;
      border-color: rgba(193, 39, 45, 0.5) !important;
    }

    /* Catch-all: any button/link inside user profile modal forced to white */
    .cl-userProfile-root button:not(.cl-formButtonPrimary):not([class*="danger"]),
    .cl-userProfile-root a:not(.cl-footerActionLink) {
      color: #ffffff !important;
    }
  `;
}

// Watch DOM to remove any API keys button if dynamically rendered
function startApiKeyRemoverObserver() {
  if (typeof window === "undefined") return;
  const observer = new MutationObserver(() => {
    const buttons = document.querySelectorAll(
      '.cl-navbarButton, button, a, div[data-tab-id]'
    );
    buttons.forEach((el) => {
      const text = el.textContent?.trim().toLowerCase();
      if (text === "api keys" || text === "api key" || el.getAttribute("data-tab-id")?.includes("api")) {
        (el as HTMLElement).style.display = "none";
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<ClerkUser | null>(null);

  const updateState = useCallback((clerkInstance: any) => {
    if (!clerkInstance) return;
    const isUserSignedIn = Boolean(clerkInstance.user);
    setIsSignedIn(isUserSignedIn);
    if (isUserSignedIn && clerkInstance.user) {
      setUser({
        id: clerkInstance.user.id,
        fullName: clerkInstance.user.fullName || clerkInstance.user.firstName || "Gamer",
        firstName: clerkInstance.user.firstName,
        lastName: clerkInstance.user.lastName,
        imageUrl: clerkInstance.user.imageUrl,
        primaryEmailAddress: clerkInstance.user.primaryEmailAddress,
        username: clerkInstance.user.username,
      });
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    injectClerkDarkStyles();
    startApiKeyRemoverObserver();
    let script: HTMLScriptElement | null = null;

    const initClerk = async () => {
      try {
        if (window.Clerk && window.Clerk.loaded) {
          updateState(window.Clerk);
          setIsLoaded(true);
          return;
        }

        const frontendApi = "possible-tuna-2366.clerk.accounts.dev";
        const scriptSrc = `https://${frontendApi}/npm/@clerk/clerk-js@5/dist/clerk.browser.js`;

        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
          script = document.createElement("script");
          script.src = scriptSrc;
          script.async = true;
          script.crossOrigin = "anonymous";
          script.setAttribute("data-clerk-publishable-key", CLERK_PUBLISHABLE_KEY);

          script.onload = async () => {
            if (window.Clerk) {
              await window.Clerk.load({
                publishableKey: CLERK_PUBLISHABLE_KEY,
                appearance: {
                  variables: {
                    colorPrimary: "#C1272D",
                    colorBackground: "#080d16",
                    colorText: "#ffffff",
                    colorTextSecondary: "#a1a1aa",
                    colorInputBackground: "#0e1626",
                    colorInputText: "#ffffff",
                  },
                },
              });

              window.Clerk.addListener(({ user: updatedUser }: any) => {
                updateState(window.Clerk);
              });

              updateState(window.Clerk);
              setIsLoaded(true);
            }
          };

          script.onerror = () => {
            console.warn("Clerk script failed to load from CDN. Using fallback state.");
            setIsLoaded(true);
          };

          document.head.appendChild(script);
        } else if (window.Clerk) {
          await window.Clerk.load({
            publishableKey: CLERK_PUBLISHABLE_KEY,
          });
          updateState(window.Clerk);
          setIsLoaded(true);
        }
      } catch (err) {
        console.error("Clerk initialization error:", err);
        setIsLoaded(true);
      }
    };

    initClerk();

    return () => {
      // cleanup
    };
  }, [updateState]);

  const openSignIn = useCallback(() => {
    if (window.Clerk) {
      window.Clerk.openSignIn({});
    } else {
      window.location.href = `https://possible-tuna-2366.clerk.accounts.dev/sign-in`;
    }
  }, []);

  const openSignUp = useCallback(() => {
    if (window.Clerk) {
      window.Clerk.openSignUp({});
    } else {
      window.location.href = `https://possible-tuna-2366.clerk.accounts.dev/sign-up`;
    }
  }, []);

  const openUserProfile = useCallback(() => {
    if (window.Clerk) {
      window.Clerk.openUserProfile({});
    }
  }, []);

  const signOut = useCallback(async () => {
    if (window.Clerk) {
      await window.Clerk.signOut();
      setIsSignedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <ClerkContext.Provider
      value={{
        isLoaded,
        isSignedIn,
        user,
        openSignIn,
        openSignUp,
        openUserProfile,
        signOut,
      }}
    >
      {children}
    </ClerkContext.Provider>
  );
}

export function useClerk() {
  return useContext(ClerkContext);
}

export function useUser() {
  const { isLoaded, isSignedIn, user } = useContext(ClerkContext);
  return { isLoaded, isSignedIn, user };
}

export function useAuth() {
  const { isLoaded, isSignedIn, signOut, openSignIn, openSignUp } = useContext(ClerkContext);
  return { isLoaded, isSignedIn, signOut, openSignIn, openSignUp };
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded || !isSignedIn) return null;
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded || isSignedIn) return null;
  return <>{children}</>;
}

export function SignInButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { openSignIn } = useAuth();
  const base = "inline-flex items-center justify-center gap-2 transition-all";
  return (
    <button
      onClick={openSignIn}
      className={
        className
          ? `${base} ${className}`
          : `${base} px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20`
      }
    >
      <LogIn className="w-3.5 h-3.5 shrink-0" />
      <span>{children || "Sign In"}</span>
    </button>
  );
}

export function SignUpButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { openSignUp } = useAuth();
  const base = "inline-flex items-center justify-center gap-2 transition-all";
  return (
    <button
      onClick={openSignUp}
      className={
        className
          ? `${base} ${className}`
          : `${base} px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#C1272D] hover:bg-[#C1272D]/90 shadow-md shadow-[#C1272D]/30`
      }
    >
      <Sparkles className="w-3.5 h-3.5 shrink-0" />
      <span>{children || "Sign Up"}</span>
    </button>
  );
}

export function UserButton() {
  const { user, openUserProfile, signOut } = useClerk();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-[#C1272D]/40 transition-all"
      >
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "User"}
            className="w-7 h-7 rounded-full object-cover ring-2 ring-[#C1272D]/40"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#C1272D]/20 text-[#C1272D] flex items-center justify-center text-xs font-bold">
            {user.firstName?.[0] || "U"}
          </div>
        )}
        <span className="text-xs font-medium text-white max-w-[100px] truncate">
          {user.firstName || user.fullName || "Account"}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl glass-panel border border-white/10 bg-[#080d16]/98 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <button
            onClick={() => {
              setDropdownOpen(false);
              openUserProfile();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all text-left"
          >
            <User className="w-3.5 h-3.5 text-[#C1272D]" />
            <span>Manage Profile</span>
          </button>

          <button
            onClick={() => {
              setDropdownOpen(false);
              signOut();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all text-left mt-1 border-t border-white/[0.06]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
