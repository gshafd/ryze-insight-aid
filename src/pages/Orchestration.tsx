import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { 
  Database, 
  FileText, 
  Brain, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Play,
  RefreshCw
} from "lucide-react";

const Orchestration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 1,
      title: "SharePoint Connection",
      description: "Establishing secure connection to STAR SharePoint repository",
      icon: Database,
      status: "completed",
      details: "Connected to 3 libraries, 847 documents detected",
      duration: "2.3s"
    },
    {
      id: 2,
      title: "Document Ingestion",
      description: "Processing and extracting content from multiple file formats",
      icon: FileText,
      status: activeStep >= 1 ? "completed" : "pending",
      details: "Processed 847 documents (PDF: 423, DOCX: 298, XLSX: 126)",
      duration: "45.2s"
    },
    {
      id: 3,
      title: "AI Processing & RAG",
      description: "Building knowledge base and semantic embeddings",
      icon: Brain,
      status: activeStep >= 2 ? "completed" : "pending",
      details: "Generated 15,293 embeddings, indexed 2.4M tokens",
      duration: "12.8s"
    },
    {
      id: 4,
      title: "Query Processing",
      description: "Ready to answer natural language questions",
      icon: MessageCircle,
      status: activeStep >= 3 ? "completed" : "pending",
      details: "Confidence scoring enabled, source attribution active",
      duration: "0.8s avg"
    }
  ];

  const sampleQueries = [
    "What are the eligibility requirements for emergency financial assistance?",
    "How do I apply for student loan forgiveness programs?",
    "What documentation is needed for hardship applications?",
    "When are financial aid disbursement dates for this semester?"
  ];

  const runDemo = () => {
    setIsRunning(true);
    setActiveStep(0);
    setProgress(0);

    const totalDuration = 8000; // 8 seconds
    const stepDuration = totalDuration / steps.length;

    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index + 1);
        setProgress(((index + 1) / steps.length) * 100);
        
        if (index === steps.length - 1) {
          setTimeout(() => setIsRunning(false), 500);
        }
      }, stepDuration * (index + 1));
    });
  };

  const getStepStatus = (stepIndex: number) => {
    if (activeStep > stepIndex) return "completed";
    if (activeStep === stepIndex && isRunning) return "running";
    return "pending";
  };

  const getStatusIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    if (status === "completed") return <CheckCircle className="w-5 h-5 text-success" />;
    if (status === "running") return <RefreshCw className="w-5 h-5 text-primary animate-spin" />;
    return <Clock className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <main className="pt-20 min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Orchestration Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Watch the complete AI agent workflow from SharePoint ingestion to intelligent query processing
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={runDemo}
              disabled={isRunning}
              className="group"
            >
              {isRunning ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              {isRunning ? "Running Demo..." : "Start Demo"}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const status = getStepStatus(index);
            
            return (
              <Card 
                key={step.id} 
                className={`bg-gradient-card border-primary/20 transition-all duration-500 ${
                  status === "running" ? "shadow-glow border-primary/60" : 
                  status === "completed" ? "border-success/40" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        status === "completed" ? "bg-success/20" :
                        status === "running" ? "bg-primary/20" : "bg-muted/20"
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          status === "completed" ? "text-success" :
                          status === "running" ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    {getStatusIcon(index)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground">{step.details}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={
                        status === "completed" ? "default" :
                        status === "running" ? "secondary" : "outline"
                      }>
                        {status === "completed" ? "Completed" :
                         status === "running" ? "Processing" : "Pending"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Duration: {step.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Sample Queries */}
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-accent" />
              Sample Query Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleQueries.map((query, index) => (
                <div 
                  key={index}
                  className="p-4 bg-muted/10 rounded-lg border border-muted/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                      "{query}"
                    </p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      Confidence: 94%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      3 sources
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Orchestration;