"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  insertCategoryFormSchema,
  InsertCategoryFormType,
  insertProductFormSchema,
  InsertProductFormType,
  SelectCategoriesType,
  SelectProductType,
} from "@/supabase/migrations/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { FieldName, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetShopId } from "@/hooks";
import { useRouter } from "@/navigation";
import { status } from "@/supabase/migrations/schema";
import { useTranslations } from "next-intl";
import { PostgresError } from "postgres";
import { useState } from "react";
import { toast } from "sonner";
import { BackButton } from "../button/back";
import { Combobox } from "../combobox";
import { GradientPicker } from "../ui/gradient-picker";

type Types = {
  performAction: (values: InsertProductFormType) => Promise<void>;
  defaultValues?: SelectProductType;
  title: string;
  stockInputKey?: FieldName<
    Pick<InsertProductFormType, "initialStock" | "currentStock">
  >;
  categoriesList: SelectCategoriesType[];
  createNewCategory: (values: InsertCategoryFormType) => Promise<void>;
};

export function ProductForm({
  performAction,
  defaultValues,
  title,
  stockInputKey = "initialStock",
  categoriesList,
  createNewCategory,
}: Types) {
  const t = useTranslations();
  const shopId = useGetShopId();
  const router = useRouter();
  const form = useForm<InsertProductFormType>({
    resolver: zodResolver(insertProductFormSchema),
    defaultValues: {
      name: "",
      barcode: "",
      initialStock: 0,
      currentStock: 0,
      [stockInputKey]: 0,
      cost: 0,
      price: 0,
      commission: 0,
      status: "ACTIVE",
      ...defaultValues,
    },
  });

  const [showCategoryDialog, setShowCategoryDialog] = useState(false);

  async function onSubmit(values: InsertProductFormType) {
    try {
      await performAction(values);
      form.reset();
      toast.success("Product saved successfully");
      router.push(`/${shopId}/products`);
    } catch (error) {
      console.error("error", error);
      toast.error(
        (error as PostgresError)?.message ||
          "An error occurred. Please try again later."
      );
    }
  }

  const onDiscard = () => {
    form.reset();
  };

  async function onSubmitCategory(values: InsertCategoryFormType) {
    try {
      console.log("values", values);
      await createNewCategory(values);
      toast.success("Category saved successfully");
      setShowCategoryDialog(false);
    } catch (error) {
      console.error("error", error);
    }
  }

  const categoryForm = useForm({
    resolver: zodResolver(insertCategoryFormSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <main className='p-4 sm:px-6 sm:py-0 md:gap-8'>
            <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
              <div className='flex items-center gap-4'>
                <BackButton />
                <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
                  {title}
                </h1>
                <div className='hidden md:ml-auto md:block'>
                  <SubmitBtns onDiscard={onDiscard} />
                </div>
              </div>
              <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
                <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                  <Card x-chunk='dashboard-07-chunk-0'>
                    <CardHeader>
                      <CardTitle>{t("Product Details")}</CardTitle>
                      <CardDescription>
                        {t("Information about the product")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-6'>
                        <div className='grid gap-2'>
                          <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("Name")}</FormLabel>
                                <FormControl>
                                  <Input placeholder='Pizza' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid gap-2'>
                          <FormField
                            control={form.control}
                            name='barcode'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("Barcode")}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='1234567890'
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid gap-2'>
                          <FormField
                            control={form.control}
                            name={stockInputKey}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {stockInputKey === "initialStock"
                                    ? t("Initial Stock")
                                    : t("Current Stock")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type='number'
                                    placeholder='0.00'
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    onFocus={(e) => e.target.select()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='grid gap-2'>
                            <FormField
                              control={form.control}
                              name='cost'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("Cost")}</FormLabel>
                                  <FormControl>
                                    <Input
                                      type='number'
                                      placeholder='0.00'
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value)
                                        )
                                      }
                                      onFocus={(e) => e.target.select()}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='grid gap-2'>
                            <FormField
                              control={form.control}
                              name='price'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("Price")}</FormLabel>
                                  <FormControl>
                                    <Input
                                      type='number'
                                      placeholder='0.00'
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value)
                                        )
                                      }
                                      onFocus={(e) => e.target.select()}
                                    />
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
                            name='commission'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("Commission")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type='number'
                                    placeholder='0.00'
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    onFocus={(e) => e.target.select()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='grid gap-3'>
                          <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("Description")}</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder={t(
                                      "A fancy pizza with pepperoni, mushrooms, and olives"
                                    )}
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card x-chunk='dashboard-07-chunk-2'>
                    <CardHeader>
                      <CardTitle>{t("Product Category")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-6 sm:grid-cols-3'>
                        <div className='grid gap-3 col-span-2'>
                          <FormField
                            control={form.control}
                            name='categoryId'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("Category")}</FormLabel>

                                <FormControl>
                                  <div>
                                    <Combobox
                                      list={categoriesList.map((category) => ({
                                        value: category.id,
                                        label: category.name,
                                        ...(category.color && {
                                          icon: () => (
                                            <div
                                              style={{
                                                background:
                                                  category.color ||
                                                  "transparent",
                                              }}
                                              className='rounded-md h-6 w-6 cursor-pointer active:scale-105'
                                            />
                                          ),
                                        }),
                                      }))}
                                      value={field.value || ""}
                                      setValue={(value) => {
                                        field.onChange(value);
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex items-end justify-end'>
                          <Button
                            variant='outline'
                            type='button'
                            onClick={() => setShowCategoryDialog(true)}
                          >
                            <PlusIcon size={20} className='mr-1' />
                            {t("Create Category")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                  <Card x-chunk='dashboard-07-chunk-3'>
                    <CardHeader>
                      <CardTitle>{t("Product Status")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-6'>
                        <div className='grid gap-3'>
                          <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("Status")}</FormLabel>
                                <Select
                                  value={field.value || ""}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger aria-label='Select status'>
                                      <SelectValue placeholder='Select status' />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {status.enumValues.map((item) => (
                                      <SelectItem key={item} value={item}>
                                        {item}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className='overflow-hidden'
                    x-chunk='dashboard-07-chunk-4'
                  >
                    <CardHeader>
                      <CardTitle>{t("Product Images")}</CardTitle>
                      <CardDescription>
                        {t("Upload images for the product")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-2'>
                        <Image
                          alt='Product image'
                          className='aspect-square w-full rounded-md object-cover'
                          height='300'
                          src='/placeholder.svg'
                          width='300'
                        />
                        <div className='grid grid-cols-3 gap-2'>
                          <Image
                            alt='Product image'
                            className='aspect-square w-full rounded-md object-cover'
                            height='84'
                            src='/placeholder.svg'
                            width='84'
                          />
                          <Image
                            alt='Product image'
                            className='aspect-square w-full rounded-md object-cover'
                            height='84'
                            src='/placeholder.svg'
                            width='84'
                          />
                          <Button
                            variant={"ghost"}
                            className='h-full aspect-square w-full border border-dashed'
                            type='button'
                          >
                            <Upload className='h-4 w-4 text-muted-foreground' />
                            <span className='sr-only'>Upload</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className='flex justify-center md:hidden'>
                <SubmitBtns onDiscard={onDiscard} />
              </div>
            </div>
          </main>
        </form>
      </Form>
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <Form {...categoryForm}>
            <form
              onSubmit={categoryForm.handleSubmit(onSubmitCategory)}
              className='space-y-8'
            >
              <DialogHeader>
                <DialogTitle>{t("New Category")}</DialogTitle>
                <DialogDescription>
                  {t("Create a new category for the product")}
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4'>
                <FormField
                  control={categoryForm.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder='Pizza' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={categoryForm.control}
                  name='color'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Color")}</FormLabel>
                      <div>
                        <GradientPicker
                          background={field.value}
                          setBackground={field.onChange}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type='submit'>
                  <CheckIcon size={20} className='mr-1' />
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const SubmitBtns = ({ onDiscard }: { onDiscard: () => void }) => {
  const t = useTranslations();
  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' size='sm' type='button' onClick={onDiscard}>
        <Trash size={15} className='mr-1' />
        {t("Discard")}
      </Button>
      <Button size='sm' type='submit'>
        <CheckIcon size={15} className='mr-1' />
        {t("Save Product")}
      </Button>
    </div>
  );
};
