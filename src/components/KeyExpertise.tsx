import { Brain, Cloud, Code2, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KeyExpertise = () => {
  const expertiseAreas = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      color: "from-purple-500 to-pink-500",
      skills: ["LLMs", "Deep Learning", "PyTorch", "Computer Vision", "NLP", "TensorFlow"]
    },
    {
      icon: Cloud,
      title: "Data & Cloud Infrastructure",
      color: "from-blue-500 to-cyan-500",
      skills: ["AWS", "Data Pipelines", "ETL Processes", "PostgreSQL", "Scalable Systems"]
    },
    {
      icon: Code2,
      title: "Software Engineering",
      color: "from-green-500 to-emerald-500",
      skills: ["Python", "Flask", "Django", "C++", "JavaScript", "Full-Stack Development"]
    },
    {
      icon: Shield,
      title: "Responsible AI & Governance",
      color: "from-orange-500 to-red-500",
      skills: ["EU AI Act", "Bias Mitigation", "Ethics", "Compliance", "IoT Security"]
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A comprehensive technology stack built on years of hands-on experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {expertiseAreas.map((area, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <area.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold mb-4 text-foreground">{area.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {area.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyExpertise;
