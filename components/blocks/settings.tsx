"use client";
import { SETTING_ITEMS } from "@/contants/list";
import { useGetShopId } from "@/hooks";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

export function Settings({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();
  const shopId = useGetShopId();

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <nav
          className='grid gap-4 text-sm text-muted-foreground'
          x-chunk='dashboard-04-chunk-0'
        >
          {SETTING_ITEMS.map((item) => {
            const href = `/${shopId}/settings${item.href}`;
            return (
              <Link
                key={item.text}
                href={href}
                className={
                  pathname === href ? "font-semibold text-primary" : undefined
                }
              >
                {t(item.text)}
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </main>
  );
}
