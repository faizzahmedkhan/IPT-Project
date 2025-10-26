import heroImage from "@/assets/hero-image.jpg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-10" />
        <img
          src={heroImage}
          alt="Tauqeer Ali Khan"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
            Ethics & AI Governance Consulting
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Helping organizations adopt AI responsibly, strategically, and with measurable business impact.
          </p>
          
          <p className="text-lg text-muted-foreground/90 max-w-3xl mx-auto mt-4">
            We guide businesses in designing ethical, compliant, and scalable AI solutions — enabling innovation without risk.
          </p>

          {/* <div className="pt-12">
            <p className="text-sm text-muted-foreground mb-4">Trusted by professionals worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              <span className="text-foreground/60 font-semibold">TensorFlow</span>
              <span className="text-foreground/60 font-semibold">PyTorch</span>
              <span className="text-foreground/60 font-semibold">AWS</span>
              <span className="text-foreground/60 font-semibold">Python</span>
              <span className="text-foreground/60 font-semibold">PostgreSQL</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
