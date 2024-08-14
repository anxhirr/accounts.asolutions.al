import { PanelLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SIDEBAR_ITEMS } from "@/contants/list";
import { Link, redirect } from "@/navigation";
import { member } from "@/supabase/migrations/schema";
import { getFromHeaders } from "@/utils/general";
import { db } from "@/utils/supabase/database";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AuthButton from "../AuthButton";
import { ShopCombobox } from "../combobox";

export async function Navbar() {
  const t = await getTranslations();
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  const { shopId, userId } = getFromHeaders();
  const members = await db.query.member.findMany({
    where: eq(member.userId, userId),
    with: {
      shop: true,
    },
  });

  const shopsList = members.map((member) => member.shop);

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect(`/login`);
  };

  return (
    <header className='py-3 sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            {SIDEBAR_ITEMS.map((item) => {
              const href = `/${shopId}${item.href}`;
              return (
                <Link href={href}>
                  <SheetTrigger asChild>
                    <div className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                      <item.icon className='h-5 w-5' />
                      {t(item.label)}
                    </div>
                  </SheetTrigger>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex gap-2'>
        <Link href={`/${shopId}`} className='flex items-center sm:hidden'>
          <div className='min-w-8'>
            <Image src='/logo.png' alt='logo' width={40} height={40} />
          </div>
          <h2 className='text-2xl font-semibold hidden sm:flex'>Inv</h2>
        </Link>
        <ShopCombobox
          list={shopsList.map((shop) => ({ value: shop.id, label: shop.name }))}
        />
      </div>
      <div className='relative ml-auto flex-1 md:grow-0'>
        <div className='hidden sm:flex'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder={`${t("Search")}...`}
            className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
          />
        </div>
      </div>
      <AuthButton signOut={signOut} user={user} />
    </header>
  );
}
