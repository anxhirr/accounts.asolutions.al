"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginSchemaType = z.infer<typeof schema>;

export function LoginForm({
  performAction,
}: {
  performAction: (values: LoginSchemaType) => Promise<{
    path: string;
  }>;
}) {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    try {
      const { path } = await performAction(values);
      router.push(path);
    } catch (error) {
      console.error("error", error);
      toast(
        (error as AuthError).message ||
          "An error occurred. Please try again later."
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>{t("Login")}</CardTitle>
            <CardDescription>
              {t("Enter your email below to login to your account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Email")}</FormLabel>
                      <FormControl>
                        <Input placeholder='example@gmail/com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Password")}</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                          placeholder='••••••••'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='w-full'>
                {form.formState.isSubmitting ? "Loading..." : "Login"}
              </Button>
              {/* <Button variant='outline' className='w-full'>
                {dictonary["Login with Google"]}
              </Button> */}
            </div>
            <div className='mt-4 text-center text-sm'>
              {t("Dont have an account")}?{" "}
              <Link
                href={`/signup${
                  redirectUrl ? `?redirectUrl=${redirectUrl}` : ""
                }`}
                className='underline'
              >
                {t("Sign up")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
