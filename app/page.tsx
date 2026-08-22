import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { StartCta } from "@/components/sections/start-cta";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSolution />
        <Services />
        <Testimonials />
        <StartCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
