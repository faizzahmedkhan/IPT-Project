import { BookOpen, Code2, Brain, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Courses = () => {
  const courses = [
    {
      icon: Code2,
      title: "Python Programming Fundamentals",
      level: "Beginner to Intermediate",
      description: "Master Python programming from basics to advanced concepts. Perfect for aspiring developers and data scientists.",
      topics: ["Syntax & Data Types", "Object-Oriented Programming", "File Handling", "Error Handling"],
    },
    {
      icon: Brain,
      title: "Machine Learning & Deep Learning",
      level: "Intermediate to Advanced",
      description: "Dive deep into ML algorithms, neural networks, and real-world AI applications using TensorFlow and PyTorch.",
      topics: ["Supervised Learning", "Neural Networks", "Computer Vision", "NLP"],
    },
    {
      icon: Database,
      title: "Data Engineering & Analytics",
      level: "Intermediate",
      description: "Learn to build robust data pipelines, work with databases, and extract actionable insights from data.",
      topics: ["SQL & PostgreSQL", "Data Pipeline Design", "ETL Processes", "Data Visualization"],
    },
    {
      icon: BookOpen,
      title: "AI for Business Leaders",
      level: "Executive Level",
      description: "Understand how to effectively incorporate AI into business operations and drive innovation.",
      topics: ["AI Strategy", "Use Case Identification", "ROI Assessment", "Responsible AI"],
    },
  ];

  return (
    <section id="courses" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Courses & Training
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Empowering the next generation with cutting-edge tech skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <course.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{course.title}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {course.level}
                  </Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">{course.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">Key Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic, idx) => (
                    <Badge key={idx} variant="outline" className="border-primary/30">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Custom Training Programs</h3>
                <p className="text-muted-foreground mb-4">
                  I offer customized training programs for organizations and individuals, 
                  tailored to your specific needs and goals.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Corporate workshops and bootcamps
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    One-on-one mentoring sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    University-level courses
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Remote and in-person options
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground mb-4">Available for training in:</p>
                <p className="text-lg font-semibold mb-6">Middlesbrough, Huddersfield & Remote</p>
                <a
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Inquire About Training
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Courses;
