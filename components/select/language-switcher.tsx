"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/middleware";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Select
      defaultValue={locale}
      onValueChange={(value) => {
        const updatedPathname = pathname.replace(`/${locale}`, `/${value}`);
        router.push(updatedPathname);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select Language' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(locale)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
