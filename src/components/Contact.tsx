import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatbotWidget from "./ChatbotWidget"; // Import the new component

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "khantauqeerali26@gmail.com",
      href: "mailto:khantauqeerali26@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+44 7904579285",
      href: "tel:+447904579285",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Middlesbrough, UK",
      subtext: "Available remote or in person (Huddersfield)",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/tauqeer-ali-khan",
      href: "https://linkedin.com/in/tauqeer-ali-khan",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "tauqeer26.github.io",
      href: "https://tauqeer26.github.io/",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ready to Adopt AI Responsibly?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            We offer consultation sessions for organizations developing or scaling AI systems. Let's discuss how we can help you innovate responsibly.
          </p>
          <p className="text-lg text-muted-foreground/80 mt-4">
            We also provide and create training programs for teams looking to understand and implement responsible AI practices.
          </p>
        </div>

        {/* UPDATED GRID: Change to max-w-6xl (slightly smaller total container) and a 2-column grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          
          {/* Column 1: Contact Information (Now occupies a single column on large screens) */}
          <Card className="p-8 md:p-10 bg-card/50 backdrop-blur-sm border-border/50 shadow-card flex flex-col justify-between">
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">Let's Connect Directly</h3>
                <p className="text-muted-foreground leading-relaxed">
                  For professional inquiries, training, or project proposals, use the direct links below.
                </p>
              </div>

              {/* Contact Icons Section - Consolidating layout slightly */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-foreground hover:text-primary transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                      {item.subtext && (
                        <p className="text-xs text-muted-foreground mt-1">{item.subtext}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional Details Section - Consolidating info at the bottom */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-primary">Availability</p>
                    <p className="text-muted-foreground text-sm">Remote consultations worldwide</p>
                    <p className="text-muted-foreground text-sm">In-person (Middlesbrough & Huddersfield)</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-primary">Education</p>
                    <p className="text-muted-foreground text-sm">University of Leeds</p>
                  </div>
              </div>

            </div>

            {/* CTA Footer - Kept for direct contact actions */}
            <div className="border-t border-border pt-8 mt-8">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Ready to start your AI journey or need a custom solution?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                    onClick={() => window.location.href = 'mailto:khantauqeerali26@gmail.com'}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Send an Email
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => window.open('https://linkedin.com/in/tauqeer-ali-khan', '_blank')}
                  >
                    <Linkedin className="mr-2 w-5 h-5" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Column 2: Chatbot Widget (Now occupies half the width) */}
          <div className="lg:col-span-1 min-h-[500px]">
            <ChatbotWidget />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;