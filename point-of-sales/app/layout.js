import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
// import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Providers } from "@/lib/redux/Provider";
import SidePanel from "@/components/sidepanel/Sidepanel";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {/* <ThemeProvider theme={theme} > */}
        <body>
          <Providers>
              <div>
                <SidePanel />
                <main>{children}</main>
              </div>
          </Providers>
        </body>
        {/* </ThemeProvider> */}
      </AppRouterCacheProvider>
    </html>
  );
}
