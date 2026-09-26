import { Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout.jsx';
import MarketplaceShell from './components/marketplace/MarketplaceShell.jsx';
import Home from './pages/Home.jsx';
import Features from './pages/Features.jsx';
import Plugins from './pages/Plugins.jsx';
import { MarketplaceHome, ControlDeckMarketplace } from './pages/Marketplace.jsx';
import MarketplaceItem from './pages/MarketplaceItem.jsx';
import MarketplaceCreator from './pages/MarketplaceCreator.jsx';
import MarketplaceLibrary from './pages/MarketplaceLibrary.jsx';
import MarketplaceCart from './pages/MarketplaceCart.jsx';
import Icons from './pages/Icons.jsx';
import Integrations from './pages/Integrations.jsx';
import Download from './pages/Download.jsx';
import Pricing from './pages/Pricing.jsx';
import Community from './pages/Community.jsx';
import Resources from './pages/Resources.jsx';
import ResourceDetail from './pages/ResourceDetail.jsx';
import Documentation from './pages/Documentation.jsx';
import Tutorials from './pages/Tutorials.jsx';
import Blog from './pages/Blog.jsx';
import Support from './pages/Support.jsx';
import SupportArticle from './pages/SupportArticle.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Licenses from './pages/Licenses.jsx';
import ReleaseNotes from './pages/ReleaseNotes.jsx';
import InstallationGuide from './pages/InstallationGuide.jsx';
import CreatorGuidelines from './pages/CreatorGuidelines.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<Home />} />
      <Route path="features" element={<Features />} />
      <Route path="plugins" element={<Plugins />} />
      <Route path="icons" element={<Icons />} />
      <Route path="integrations" element={<Integrations />} />
      <Route path="download" element={<Download />} />
      <Route path="release-notes" element={<ReleaseNotes />} />
      <Route path="installation-guide" element={<InstallationGuide />} />
      <Route path="creator-guidelines" element={<CreatorGuidelines />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="community" element={<Community />} />
      <Route path="resources" element={<Resources />} />
      <Route path="resources/:slug" element={<ResourceDetail />} />
      <Route path="documentation" element={<Documentation />} />
      <Route path="tutorials" element={<Tutorials />} />
      <Route path="blog" element={<Blog />} />
      <Route path="support" element={<Support />} />
      <Route path="support/:slug" element={<SupportArticle />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="licenses" element={<Licenses />} />
      <Route path="admin" element={<Admin />} />

      <Route path="marketplace" element={<MarketplaceShell />}>
        <Route index element={<MarketplaceHome />} />
        <Route path="control-deck" element={<ControlDeckMarketplace />} />
        <Route path="library" element={<MarketplaceLibrary />} />
        <Route path="cart" element={<MarketplaceCart />} />
        <Route path="maker/:slug" element={<MarketplaceCreator />} />
        <Route path=":slug" element={<MarketplaceItem />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
  </Routes>
}
