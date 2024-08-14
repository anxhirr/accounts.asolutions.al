import { Bell, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SIDEBAR_ITEMS } from "@/contants/list";
import { Messages } from "@/global";
import { Link } from "@/navigation";
import { getFromHeaders } from "@/utils/general";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function Sidebar() {
  const t = await getTranslations();
  const { shopId } = getFromHeaders();
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 md:w-60 flex-col border-r bg-background sm:flex px-4'>
      <div className='flex py-2 items-center border-b'>
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          <div className='min-w-6'>
            <Image src='/logo.png' alt='logo' width={40} height={40} />
          </div>
          <span className='hidden md:flex'>Inv</span>
        </Link>
        <Button
          variant='outline'
          size='icon'
          className='ml-auto h-8 w-8 hidden md:flex'
        >
          <Bell className='h-4 w-4' />
          <span className='sr-only'>{t("Toggle notifications")}</span>
        </Button>
      </div>
      <nav className='flex flex-col items-center gap-2 sm:py-4'>
        {SIDEBAR_ITEMS.map((item) => {
          const href = `/${shopId}${item.href}`;
          return (
            <NavItem
              key={item.label}
              href={href}
              icon={<item.icon className='h-5 w-5' />}
              label={item.label}
            />
          );
        })}
      </nav>
      <div className='mt-auto'>
        <Card x-chunk='dashboard-02-chunk-0' className='hidden md:block'>
          <CardHeader className='p-2 pt-0 md:p-4'>
            <CardTitle>{t("Upgrade to Pro")}</CardTitle>
            <CardDescription>
              {t(
                "Unlock all features and get unlimited access to our support team"
              )}
              .
            </CardDescription>
          </CardHeader>
          <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
            <Link href={"https://www.asolutions.al/pricing"}>
              <Button size='sm' className='w-full'>
                {t("Upgrade")}
              </Button>
            </Link>
          </CardContent>
        </Card>
        <nav className='py-4'>
          <NavItem
            href={`/${shopId}/settings`}
            icon={<Settings className='h-5 w-5' />}
            label='Settings'
          />
        </nav>
      </div>
    </aside>
  );
}

const NavItem = async ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: keyof Messages;
}) => {
  const t = await getTranslations();
  const isActive = false;

  return (
    <Tooltip>
      <Link
        href={href}
        className={`w-full transition-colors hover:text-foreground ${
          isActive ? "!text-foreground" : "text-muted-foreground"
        }`}
      >
        <TooltipTrigger asChild>
          <div className='flex items-center'>
            <div className='h-9 w-9 flex items-center justify-center'>
              {icon}
            </div>
            <span className='sr-only md:not-sr-only'>{t(label)}</span>
          </div>
        </TooltipTrigger>
      </Link>
      <TooltipContent side='right'>{t(label)}</TooltipContent>
    </Tooltip>
  );
};
