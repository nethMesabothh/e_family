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
import { useState } from "react";
import FileUploader from "@/components/main/file-uploader/file-uploader";
import { useUploadThing } from "@/lib/uploadthing";
import { Textarea } from "@/components/ui/textarea";

const productSchema = z.object({
  productName: z.string().min(3, {
    message: "ProductName must be at least 3 characters.",
  }),
  imageUrl: z.string(),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
});

export const ProductForm = () => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      imageUrl: "",
      description: "",
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
  }

  return (
    <div>
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
          {/* Image Uploader */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>File Upload</FormLabel>
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
