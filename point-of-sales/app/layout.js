import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { AppWrapper } from "@/context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <body>
          {/* when the app is launched it goes in appwrapper and gets all the state and user session */}
          <AppWrapper>{children}</AppWrapper>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
