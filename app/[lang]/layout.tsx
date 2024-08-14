import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appUrl } from "@/contants/consts";
import { StoreProvider } from "@/providers/store-provider";
import { getFromHeaders } from "@/utils";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(appUrl),
  title: "Inv",
  description: "The fastest way to manage your inventory",
};

export const fetchCache = "force-no-store";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const { memberRole } = getFromHeaders();

  return (
    <html lang='en' className={GeistSans.className}>
      <NextIntlClientProvider messages={messages}>
        <StoreProvider
          initState={{
            role: memberRole,
          }}
        >
          <TooltipProvider>
            <body className='bg-background text-foreground'>
              <main className='min-h-screen flex flex-col'>{children}</main>
            </body>
            <Toaster />
          </TooltipProvider>
        </StoreProvider>
      </NextIntlClientProvider>
    </html>
  );
}
