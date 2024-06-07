"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { urlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchProduct = ({
  placeholder = "ស្វែងរកទំនិញ...",
}: {
  placeholder?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (searchQuery) {
        newUrl = urlQuery({
          params: searchParams.toString(),
          key: "searchQuery",
          value: searchQuery,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["searchQuery"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, searchQuery, router]);

  return (
    <div className="mt-6 flex justify-center">
      <Input
        className="w-[15rem]"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
