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
import { AuthApiError } from "@supabase/supabase-js";
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
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupSchemaType = z.infer<typeof schema>;

export function SignupForm({
  performAction,
}: {
  performAction: (values: SignupSchemaType) => Promise<{
    path: string;
  }>;
}) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupSchemaType) {
    try {
      console.log("values", values);
      const { path } = await performAction(values);
      console.log("path", path);
      router.push(path);
    } catch (error) {
      console.error("error", error);
      toast(
        (error as AuthApiError)?.message ||
          "An error occurred. Please try again later."
      );
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-xl'>{t("Sign Up")}</CardTitle>
            <CardDescription>
              {t("Enter your information to create an account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("First name")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='John' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Last name")}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Doe' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                {t("Create an account")}
              </Button>
              {/* <Button variant='outline' className='w-full'>
                Sign up with GitHub
              </Button> */}
            </div>
            <div className='mt-4 text-center text-sm'>
              {t("Already have an account")}?{" "}
              <Link
                href={`/signin${
                  redirectUrl ? `?redirectUrl=${redirectUrl}` : ""
                }`}
                className='underline'
              >
                {t("Sign in")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
