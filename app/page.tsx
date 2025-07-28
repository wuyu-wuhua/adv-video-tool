import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import VideoShowcase from '@/components/VideoShowcase'
import DemandForm from '@/components/DemandForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <VideoShowcase />
      <DemandForm />
      <Footer />
    </main>
  )
} 