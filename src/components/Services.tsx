import { Code, Palette, Cog, BarChart, GraduationCap, Briefcase, HeadphonesIcon, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Cog,
      title: "AI Governance Frameworks",
      description: "Design governance structures that define how AI is evaluated, approved, monitored, and responsibly scaled across your organization",
    },
    {
      icon: FileText,
      title: "Responsible AI Policy Development",
      description: "Create clear, practical internal policies addressing data privacy, fairness, transparency, bias mitigation, accountability, and ethical model deployment",
    },
    {
      icon: BarChart,
      title: "AI Risk Assessment & Compliance",
      description: "Evaluate AI systems using global standards including EU AI Act, NIST AI Risk Management Framework, and ISO/IEC AI 23894",
    },
    {
      icon: Code,
      title: "AI Strategy & Implementation Roadmaps",
      description: "Translate ethical AI principles into business processes, workflows, and operational plans aligned to your strategic goals",
    },
    {
      icon: GraduationCap,
      title: "Leadership Advisory & Capability Training",
      description: "Upskill executives and teams to understand risks, implement safe AI practices, and make informed governance decisions",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="p-8 bg-card border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Business Outcomes & Value</h3>
              <p className="text-muted-foreground mb-6">
                Our consulting is practical. We focus on delivering outcomes that support your business strategy.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                "Reduce legal, regulatory, and reputational risk",
                "Build customer and stakeholder trust",
                "Improve reliability and transparency of AI decisions",
                "Enable secure and sustainable AI adoption across teams",
                "Create competitive advantage through responsible innovation",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground/90">{outcome}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-6 border-t border-border">
              <p className="text-lg font-semibold text-primary mb-4">
                Responsible AI is not just the right thing to do — it is a business performance strategy.
              </p>
              <a
                href="/contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
