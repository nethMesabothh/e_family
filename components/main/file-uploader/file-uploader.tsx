"use client";
import React, { useState, useCallback } from "react";
interface Props {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
import { convertFileToUrl } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-gray-50 bg-blend-darken"
      >
        <input {...getInputProps()} className="cursor-pointer" />

        {imageUrl ? (
          <div className="flex h-full w-full flex-1 justify-center ">
            <Image
              src={imageUrl}
              alt="image"
              width={250}
              height={250}
              className="w-full object-cover object-center"
            />
          </div>
        ) : (
          <div className="text-grey-500 flex flex-col items-center justify-center py-5">
            <Image
              src="assets/upload.svg"
              width={77}
              height={77}
              alt="file upload"
            />
            <h3 className="mb-2 mt-2">Drag photo here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG, No more than 4 MB</p>
            <Button type="button" className="rounded-full">
              Select from computer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
