import HeroSection from '../sections/HeroSection.jsx';
import TrustStrip from '../sections/TrustStrip.jsx';
import FeaturesSection from '../sections/FeaturesSection.jsx';
import HowItWorks from '../sections/HowItWorks.jsx';
import ProductShowcase from '../sections/ProductShowcase.jsx';
import MarketplacePreview from '../sections/MarketplacePreview.jsx';
import IntegrationsPreview from '../sections/IntegrationsPreview.jsx';
import FinalCTA from '../sections/FinalCTA.jsx';
export default function Home() {
    return <>
        <HeroSection />
        <TrustStrip />
        <FeaturesSection />
        <HowItWorks />
        <ProductShowcase />
        <MarketplacePreview />
        <IntegrationsPreview />
        <FinalCTA />
    </>
}
