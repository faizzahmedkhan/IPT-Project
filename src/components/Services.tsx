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
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive solutions for your technology and training needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-card border-border">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Looking for a custom solution?</h3>
              <p className="text-muted-foreground mb-6">
                I specialize in creating tailored solutions that address your unique challenges. 
                Let's discuss how I can help bring your vision to life.
              </p>
              <a
                href="#contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
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
