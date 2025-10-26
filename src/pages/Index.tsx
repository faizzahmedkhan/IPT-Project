import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KeyExpertise from "@/components/KeyExpertise";
import ActionFunnel from "@/components/ActionFunnel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <KeyExpertise />
      <ActionFunnel />
      <Footer />
    </div>
  );
};

export default Index;
