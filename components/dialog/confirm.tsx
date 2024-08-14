"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Messages } from "@/global";
import { useClearSearchParams } from "@/hooks";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { PostgresError } from "postgres";
import { toast } from "sonner";

export function ConfirmDialog({
  performAction,
  action,
  table,
  extraDescription,
}: {
  performAction: () => Promise<void>;
  action: keyof Messages;
  table: keyof Messages;
  extraDescription?: keyof Messages;
}) {
  const t = useTranslations();
  const router = useRouter();
  const { path } = useClearSearchParams({ keys: ["row", "action"] });

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (open) return;
        router.push(path);
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {t(action)} {t(table)}
          </DialogTitle>
          <DialogDescription>
            {t("Are you sure you want to")}
            <span className='font-semibold'> {t(action)} </span>
            {t("this")}
            <span className='font-semibold'> {t(table)} </span>?
            {extraDescription && (
              <span className='block'>{t(extraDescription)}</span>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='gap-2'>
          <DialogTrigger asChild>
            <Button
              type='submit'
              onClick={async () => {
                try {
                  await performAction();
                  console.log("action success");
                  toast.success(`${table} ${action.toLowerCase()} success`);
                } catch (error) {
                  toast.error(
                    (error as PostgresError)?.message ||
                      "An error occurred. Please try again later."
                  );
                }
              }}
            >
              Yes
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant='outline' type='button'>
              No
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
