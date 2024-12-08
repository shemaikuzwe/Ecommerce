import Footer from "@/components/home/footer";
import HomeCard from "@/components/home/home-card";
import ImageSlider from "@/components/ui/img-slider";
import { getProducts } from "@/lib/action/server";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const products=getProducts()
    return (
    <div className="p-14 flex flex-col gap-5">
      <ImageSlider productsPromise={products}/>
      <HomeCard name="Featured"/>
      <HomeCard name="Latest"/>
      <Footer/>
    </div>
  );
}
