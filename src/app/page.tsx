import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { heroapi, footerAPI, highlightAPI, sneakerAPI, popularSales } from '@/data/data';
import Footer from '@/components/Footer';
import Highlight from '@/components/Highlight';
import Sales from '@/components/Sales';

export default function Home() {
  return (
    <div>
      {' '}
      <Header />
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales popularSales={popularSales} ifExists />
        <Highlight highlightAPI={highlightAPI} ifExists />
        <Highlight highlightAPI={sneakerAPI} />
      </main>
      <Footer footerAPI={footerAPI} />
    </div>
  );
}
