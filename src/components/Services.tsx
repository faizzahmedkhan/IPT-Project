import { Code, Palette, Cog, BarChart, GraduationCap, Briefcase, HeadphonesIcon, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Building robust, scalable web applications using modern technologies and best practices",
    },
    {
      icon: Palette,
      title: "Web Design",
      description: "Creating beautiful, user-friendly interfaces that deliver exceptional user experiences",
    },
    {
      icon: Cog,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business needs",
    },
    {
      icon: BarChart,
      title: "Business Analytics",
      description: "Data-driven insights to help you make informed business decisions",
    },
    {
      icon: GraduationCap,
      title: "Corporate Training",
      description: "Professional technical training programs for teams and organizations",
    },
    {
      icon: Briefcase,
      title: "IT Consulting",
      description: "Strategic technology consulting to help your business thrive in the digital age",
    },
    {
      icon: HeadphonesIcon,
      title: "Career Development Coaching",
      description: "Personalized guidance to help professionals advance their tech careers",
    },
    {
      icon: FileText,
      title: "SaaS Development",
      description: "End-to-end SaaS product development from concept to deployment",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive solutions for your technology and training needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Looking for a custom solution?</h3>
              <p className="text-muted-foreground mb-6">
                I specialize in creating tailored solutions that address your unique challenges. 
                Let's discuss how I can help bring your vision to life.
              </p>
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Contact for Pricing
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
