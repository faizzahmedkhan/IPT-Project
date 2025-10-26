import { Brain, Lightbulb, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "Reduce Risk",
      description: "Minimize legal, regulatory, and reputational risks through responsible AI practices",
    },
    {
      icon: Lightbulb,
      title: "Build Trust",
      description: "Establish customer and stakeholder confidence with transparent AI governance",
    },
    {
      icon: Users,
      title: "Enable Innovation",
      description: "Create competitive advantage through responsible and sustainable AI adoption",
    },
    {
      icon: Award,
      title: "Ensure Compliance",
      description: "Meet global AI standards including EU AI Act, NIST, and ISO frameworks",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Bridging the gap between AI innovation and responsible governance
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <p className="text-lg leading-relaxed text-foreground/90 mb-6">
              Organizations across the world are integrating artificial intelligence to enhance efficiency, decision-making, and customer value. Yet the impact of AI is not only technical — it raises critical questions about trust, accountability, fairness, regulation, and organizational readiness.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 mb-6">
              We provide leadership teams with the clarity, frameworks, and strategies needed to deploy AI responsibly and confidently. Our mission is to ensure that the benefits of AI are realized while protecting people, organizations, and society.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 font-semibold">
              We bridge the gap between AI innovation and responsible governance.
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Who We Work With</h3>
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <p className="text-lg text-foreground/90 mb-6">
              We support organizations that are developing AI solutions, integrating AI into internal operations, scaling data-driven decision systems, or preparing for regulatory oversight.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary mb-3">Industries We Serve</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Healthcare organizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Financial and professional services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Technology companies and startups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Government and public institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Education and research organizations</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">Our Approach</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Our consulting is practical. We focus on delivering outcomes that support your business strategy. Responsible AI is not just the right thing to do — it is a business performance strategy.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
