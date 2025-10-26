import { Briefcase, GraduationCap, Handshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ActionFunnel = () => {
  const actions = [
    {
      icon: Briefcase,
      title: "Hire for a Project",
      description: "Looking for an expert to deliver impactful AI solutions? Let's collaborate on building ethical, compliant, and scalable systems tailored to your business needs.",
      link: "/contact",
      buttonText: "Start Your Project",
      variant: "default" as const
    },
    {
      icon: GraduationCap,
      title: "Master New Skills",
      description: "Ready to upskill your team or yourself? Explore comprehensive courses on AI, ML, Python, and responsible AI governance designed for all levels.",
      link: "/courses",
      buttonText: "Explore Courses",
      variant: "outline" as const
    },
    {
      icon: Handshake,
      title: "Explore Partnerships",
      description: "Interested in long-term collaboration or consulting engagements? I work with organizations to establish sustainable AI strategies and governance frameworks.",
      link: "/contact",
      buttonText: "Let's Connect",
      variant: "secondary" as const
    }
  ];

  return (
    <section id="action-funnel" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What's Your Next Step?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the path that aligns with your goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {actions.map((action, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-[1.02] group flex flex-col"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <action.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">{action.title}</h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                {action.description}
              </p>
              
              <Link to={action.link}>
                <Button variant={action.variant} className="w-full">
                  {action.buttonText}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionFunnel;
