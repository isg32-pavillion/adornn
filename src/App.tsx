import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Account = lazy(() => import("./pages/Account"));
const BathAndBody = lazy(() => import("./pages/BathAndBody"));
const Skincare = lazy(() => import("./pages/Skincare"));
const HairCare = lazy(() => import("./pages/HairCare"));
const KitsAndGifts = lazy(() => import("./pages/KitsAndGifts"));
const StyleQuizPage = lazy(() => import("./pages/StyleQuizPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Shipping = lazy(() => import("./pages/Shipping"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const Care = lazy(() => import("./pages/Care"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Returns = lazy(() => import("./pages/Returns"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen bg-background">
                <Navigation />
                <main>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/shop/bath-and-body" element={<BathAndBody />} />
                      <Route path="/shop/skincare" element={<Skincare />} />
                      <Route path="/shop/hair-care" element={<HairCare />} />
                      <Route path="/shop/kits-and-gifts" element={<KitsAndGifts />} />
                      <Route path="/style-quiz" element={<StyleQuizPage />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/shipping" element={<Shipping />} />
                      <Route path="/size-guide" element={<SizeGuide />} />
                      <Route path="/care" element={<Care />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
