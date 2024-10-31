"use client";

import React from "react";
import { ProductDetailComponent } from "@/components/product-detail";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();
  return <ProductDetailComponent id={id} />;
}

export default Page;
