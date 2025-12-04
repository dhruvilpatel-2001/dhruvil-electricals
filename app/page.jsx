import { supabase } from "../lib/supabaseClient.js";
import Hero from "./components/Hero";
import HomeServicesSection from "./components/HomeServicesSection";
import StatsSection from "./components/StatsSection";
import WhyChooseSection from "./components/WhyChooseSection";
import CTASection from "./components/CTASection";
import HomeVideoSection from "./components/HomeVideoSection";
import HomeFaqSection from "./components/HomeFaqSection";
import HomeTestimonialsSection from "./components/HomeTestimonialsSection";
import HomeBrandsSection from "./components/HomeBrandsSection";
import ContactPage from "./contact/page";
import AboutPage from "./about/page";

export default async function HomePage() {
  const [
    { data: services },
    { data: stats },
    { data: whyItems },
    { data: cta },
    { data: works },
    { data: testimonials },
    { data: faq }
  ] = await Promise.all([
    supabase.from("homepage_services").select("*").order("id"),
    supabase.from("homepage_stats").select("*").order("id"),
    supabase.from("homepage_why_choose").select("*").order("id"),
    supabase.from("homepage_cta").select("*").maybeSingle(),
    supabase.from("works").select("*").order("id", { ascending: false }).limit(3),
    supabase.from("testimonials").select("*").order("id", { ascending: false }).limit(3),
    supabase.from("faq").select("*").order("id").limit(4),
  ]);

  return (
    <>
      <Hero />
      <AboutPage/>
      <HomeServicesSection services={services || []} />
      <HomeTestimonialsSection testimonials={testimonials || []} />
      <HomeFaqSection faq={faq || []} />
      {/* <HomeVideoSection /> */}
      {/* <HomeBrandsSection /> */}

      <StatsSection stats={stats || []} />
      <WhyChooseSection items={whyItems || []} />
      <ContactPage/>
      {/* <CTASection cta={cta || null} /> */}
    </>
  );
}
