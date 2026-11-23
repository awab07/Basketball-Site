import { Link } from 'react-router-dom'
import FAQ from '@/features/home/components/FAQ'
import GallerySection from '@/features/home/components/GallerySection'
import Hero from '@/features/home/components/Hero'
import HowItWorks from '@/features/home/components/HowItWorks'
import LiveEditor from '@/features/home/components/LiveEditor'
import Newsletter from '@/features/home/components/Newsletter'
import SeeWhatsPossible from '@/features/home/components/SeeWhatsPossible'
import ShopBySize from '@/features/home/components/ShopBySize'
import TeamOrders from '@/features/home/components/TeamOrders'
import Footer from '@/shared/components/layout/Footer'
import Navbar from '@/shared/components/layout/Navbar'

function HomePage() {
  return (
    <div className="font-[var(--font-sans)] text-[var(--ink)]">
      <Navbar />
      <Hero />
      <ShopBySize />
      <HowItWorks />

      <LiveEditor />
      <SeeWhatsPossible />
      <TeamOrders />

      <GallerySection />

      {/* CTA */}
      <section className="bg-[var(--accent)] py-20 text-center text-white">
        <div className="mx-auto max-w-[640px] px-6">
          <h2 className="font-[var(--font-display)] text-[clamp(28px,4vw,42px)] leading-tight">
            Ready to design your ball?
          </h2>
          <p className="mt-4 mb-8 text-base text-white/90">
            It takes less than two minutes to build something only you own.
          </p>
          <Link
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-sm font-semibold text-white transition hover:bg-black"
            to="/design"
          >
            Start Customizing
          </Link>
        </div>
      </section>

      <FAQ />
      <Newsletter />

      <Footer />
    </div>
  )
}

export default HomePage
