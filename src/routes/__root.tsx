import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { GoldCursor } from "@/components/layout/gold-cursor";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "VisolPremium";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host ? `https://${host}/og.jpg` : undefined;
const xBanner = host
  ? `https://og.grok.me/v1/banner.png?host=${encodeURIComponent(host)}&title=${encodeURIComponent(APP_NAME)}&color=6B2D3C`
  : undefined;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VisolPremium — Premium taklifnomalar va tabriknomalar" },
      {
        name: "description",
        content:
          "VisolPremium — to'y, tug'ilgan kun va tabrik uchun premium raqamli taklifnomalar. 3D dizayn, video tabrik va shaxsiy havola.",
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#6B2D3C" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "VisolPremium — Premium taklifnomalar va tabriknomalar" },
      {
        property: "og:description",
        content: "Har bir lahza o'z hikoyasiga loyiq. Premium raqamli taklifnomalar studiyasi.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "uz_UZ" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      ...(xBanner
        ? [
            { property: "x:game:image", content: xBanner },
            { property: "x:game:image:width", content: "1200" },
            { property: "x:game:image:height", content: "264" },
          ]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Great+Vibes&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="uz" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-ivory text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <SmoothScroll>
            <Outlet />
          </SmoothScroll>
        </AuthProvider>
        <GoldCursor />
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-sans !bg-ivory !text-ink !border-gold/30",
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
