"use client";

import { CheckIcon, ChevronsUpDown, LucideIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Combobox({
  list,
  value,
  setValue,
}: {
  list: {
    value: string;
    label: string;
    icon?: LucideIcon | React.ComponentType;
    keywords?: string[];
  }[];
  value: string;
  setValue: (value: string) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  const selected = list.find((framework) => framework.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          <div className='flex gap-2 items-center'>
            {selected?.icon && <selected.icon className='h-4 w-4' />}
            {selected?.label || `${t("Select")}...`}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='start'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {list.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  keywords={[framework.label, ...(framework.keywords || [])]}
                  onSelect={(currentValue) => {
                    const newVal = currentValue === value ? "" : currentValue;
                    setValue(newVal);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className='flex gap-2 items-center'>
                    {framework.icon && <framework.icon className='h-4 w-4' />}
                    {framework.label}
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
