"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import FileUploader from "@/components/main/file-uploader/file-uploader";
import { useUploadThing } from "@/lib/uploadthing";
import { Textarea } from "@/components/ui/textarea";
import { DropDownCategory } from "@/components/main/category/drop-down-category";
import { DatePicker } from "@/components/main/date-picker/date-picker";
import { LoaderCircle } from "lucide-react";
import { createProduct } from "@/actions/product-logic";
import { useAuth } from "@clerk/nextjs";
import { fetchCurrentUser } from "@/queries/users";

const productSchema = z.object({
  productName: z.string().min(3, {
    message: "ProductName must be at least 3 characters.",
  }),
  categoryId: z.string(),
  imageUrl: z.string(),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  price: z.string(),
  dayInStock: z.date(),
});

export const ProductForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchCurrentUser(userId ? userId : "");

      if (data?.role === "ADMIN") {
        setIsAdmin(true);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      imageUrl: "",
      description: "",
      categoryId: "",
      price: "",
      dayInStock: new Date(),
    },
  });

  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof productSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        alert("No Image or Your Image need to smaller than 4MB");
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    console.log({ ...values, imageUrl: uploadedImageUrl });
    const product = await createProduct({
      values: { ...values, imageUrl: uploadedImageUrl },
    });
    if (product.length > 0) {
      form.reset();
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching user data
  }

  return (
    <div>
      {isAdmin ? (
        <Form {...form}>
          {/* Product Name */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <DropDownCategory
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image Uploader */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>File Upload Should be 500px x 500px</FormLabel>
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Product description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product Description"
                      {...field}
                      className="h-44"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Product price should have khmer riel and dollar*/}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date pick product in stock*/}
            <FormField
              control={form.control}
              name="dayInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DayInStock</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onFieldChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="button col-span-2 w-full"
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-3">
                  <h1>Submitting...</h1>
                  <LoaderCircle className="ml-2 h-3 w-3 animate-spin transition-all" />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        "Only Admin Can Create Product"
      )}
    </div>
  );
};
