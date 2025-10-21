import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      icon: Globe,
      label: "Website",
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
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Let's discuss how we can work together to bring your ideas to life
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're looking for AI consulting, training programs, or custom development solutions, 
                    I'm here to help. Feel free to reach out through any of the channels below.
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary">Availability</p>
                  <p className="text-muted-foreground">Remote consultations worldwide</p>
                  <p className="text-muted-foreground">In-person meetings in Middlesbrough & Huddersfield</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary">Education</p>
                  <p className="text-muted-foreground">University of Leeds</p>
                </div>
              </div>

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
            </div>

            <div className="border-t border-border pt-8">
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
