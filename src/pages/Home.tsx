import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Brain, Shield, Zap, FileText, BarChart } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Database,
      title: "SharePoint Integration",
      description: "Seamlessly connect to STAR SharePoint via Microsoft Graph API with full access control"
    },
    {
      icon: Brain,
      title: "AI-Powered RAG",
      description: "Retrieval-Augmented Generation for accurate, evidence-backed responses"
    },
    {
      icon: FileText,
      title: "Multi-Format Ingestion", 
      description: "Process PDF, Word, Excel, PowerPoint, and more with OCR support"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "On-premise deployment with full data privacy and access controls"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Live document ingestion and instant query responses"
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Monitor performance, track queries, and view confidence scores"
    }
  ];

  return (
    <>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-background/60" />
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-float">
                Autonomous AI Agent
                <br />
                <span className="text-4xl md:text-6xl">for Financial Assistance</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Connect to SharePoint, ingest diverse documents, and enable natural language queries 
                with evidence-backed responses powered by advanced RAG technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/orchestration">
                  <Button variant="hero" size="xl" className="group">
                    View Orchestration Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="glass" size="xl">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>SharePoint Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>AI Processing Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span>Security Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 gradient-text">
                Enterprise-Grade AI Capabilities
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built for financial assistance teams with advanced document processing, 
                secure integrations, and intelligent query understanding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:shadow-glow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Experience the power of AI-driven document processing and intelligent query systems
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button variant="hero" size="xl">
                    Start Free Trial
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;