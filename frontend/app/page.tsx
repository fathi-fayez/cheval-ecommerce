import BestSeller from "@/components/home/BestSeller";
import Hero from "@/components/home/Hero";
import LatestCollection from "@/components/home/LatestCollection";
import OurPolicy from "@/components/home/OurPolicy";
import NewsletterBox from "@/components/ui/NewsletterBox";
import { getProducts } from "@/lib/api";

export default async function Home() {
  let latest: Awaited<ReturnType<typeof getProducts>> = [];
  let bestsellers: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    [latest, bestsellers] = await Promise.all([
      getProducts({ sort: "-createdAt", limit: 10 }),
      getProducts({ bestseller: true, limit: 5 }),
    ]);
  } catch {
    latest = [];
    bestsellers = [];
  }

  return (
    <div className="pb-4 pt-6 sm:pt-8">
      <Hero />
      <LatestCollection products={latest} />
      <BestSeller products={bestsellers} />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}
