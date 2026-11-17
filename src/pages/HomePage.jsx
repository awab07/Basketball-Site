import { Link } from 'react-router-dom'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import GallerySection from '../components/GallerySection'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import LiveEditor from '../components/LiveEditor'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import SeeWhatsPossible from '../components/SeeWhatsPossible'
import ShopBySize from '../components/ShopBySize'
import TeamOrders from '../components/TeamOrders'

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
