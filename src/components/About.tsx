import { Brain, Lightbulb, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI Specialist",
      description: "Developed cutting-edge systems using TensorFlow, PyTorch, and NLP technologies",
    },
    {
      icon: Lightbulb,
      title: "Data Engineer",
      description: "4+ years of experience in AI-driven data solutions and robust backend development",
    },
    {
      icon: Users,
      title: "Mentor & Educator",
      description: "Empowering students as a Python and Machine Learning lecturer",
    },
    {
      icon: Award,
      title: "Professional Trainer",
      description: "Technical training to professionals and undergraduate students",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A passionate advocate for innovation through AI and data
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <p className="text-lg leading-relaxed text-foreground/90 mb-6">
              I'm a senior technology professional specializing in Machine Learning (ML), Internet of Things (IoT), 
              Responsible AI, and Large Language Models (LLMs). My passion lies in creating intelligent solutions 
              and mentoring the next generation of tech professionals.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              My core commitment is to leverage AI and data to solve real-world problems, drive innovation, and 
              help individuals and businesses understand how AI can be effectively incorporated into their operations. 
              Since writing my first Arduino C++ code in 2017, I've been on an incredible journey through the world 
              of data and AI.
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
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Expertise</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Languages", skills: "Python, JavaScript, C++" },
              { category: "AI/ML Frameworks", skills: "TensorFlow, Keras, PyTorch" },
              { category: "Backend & APIs", skills: "Flask, Django, REST APIs" },
              { category: "Database", skills: "PostgreSQL" },
              { category: "Cloud", skills: "AWS Infrastructure" },
              { category: "Specializations", skills: "Computer Vision, Deep Learning, NLP" },
            ].map((item, index) => (
              <Card key={index} className="p-6 bg-muted/30 border-border/50">
                <h4 className="font-semibold text-primary mb-2">{item.category}</h4>
                <p className="text-sm text-muted-foreground">{item.skills}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
