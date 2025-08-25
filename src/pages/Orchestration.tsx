import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  RefreshCw,
  User,
  Shield,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  FileOutput,
  Activity,
  Users,
  Send
} from "lucide-react";

const Orchestration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentUser] = useState({ role: "supervisor", name: "Sarah Johnson" });
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [processingResults, setProcessingResults] = useState<any>(null);
  const [hitlFeedback, setHitlFeedback] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [finalReport, setFinalReport] = useState<any>(null);

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

  const reviewers = [
    { id: "reviewer1", name: "Dr. Michael Chen", role: "Financial Aid Director", expertise: "Policy Review" },
    { id: "reviewer2", name: "Lisa Martinez", role: "Senior Counselor", expertise: "Student Services" },
    { id: "reviewer3", name: "James Wilson", role: "Compliance Officer", expertise: "Regulatory Compliance" }
  ];

  const addLog = (type: string, message: string, user?: string) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type,
      message,
      user: user || currentUser.name,
      role: currentUser.role
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const runDemo = () => {
    setIsRunning(true);
    setActiveStep(0);
    setProgress(0);
    addLog("system", "Workflow orchestration demo started");

    const totalDuration = 8000; // 8 seconds
    const stepDuration = totalDuration / steps.length;

    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index + 1);
        setProgress(((index + 1) / steps.length) * 100);
        addLog("system", `Completed step: ${steps[index].title}`);
        
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            addLog("system", "Workflow orchestration demo completed");
          }, 500);
        }
      }, stepDuration * (index + 1));
    });
  };

  const processQuery = () => {
    if (!currentQuery.trim()) return;
    
    setQueryProcessing(true);
    addLog("query", `Processing query: "${currentQuery}"`);

    // Simulate AI processing with realistic results
    setTimeout(() => {
      const result = {
        query: currentQuery,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        sources: [
          { title: "Financial Aid Policy Manual", section: "Section 4.2.1", confidence: 94, flagged: false },
          { title: "Emergency Assistance Guidelines", section: "Eligibility Requirements", confidence: 89, flagged: true },
          { title: "Federal Student Aid Handbook", section: "Chapter 6", confidence: 87, flagged: false }
        ],
        initialResponse: "Based on current policies, emergency financial assistance requires documentation of financial hardship, enrollment verification, and completion of FAFSA. However, there may be exceptions for urgent cases.",
        requiresReview: true,
        processingTime: "1.2s"
      };
      
      setProcessingResults(result);
      setQueryProcessing(false);
      addLog("ai", "AI processing completed - flagged for human review due to policy uncertainty");
    }, 2500);
  };

  const submitFeedback = () => {
    if (!hitlFeedback.trim() || !selectedReviewer) return;

    const reviewer = reviewers.find(r => r.id === selectedReviewer);
    addLog("hitl", `HITL feedback submitted by ${reviewer?.name}`, reviewer?.name);
    
    // Generate final report
    setTimeout(() => {
      const report = {
        queryId: Date.now(),
        originalQuery: currentQuery,
        aiResponse: processingResults.initialResponse,
        humanReview: hitlFeedback,
        reviewer: reviewer,
        finalDecision: "approved",
        confidence: processingResults.confidence + 5, // Boost after human review
        timestamp: new Date().toISOString(),
        processingTime: processingResults.processingTime,
        totalTime: "45.7s"
      };
      
      setFinalReport(report);
      addLog("report", "Final report generated and approved for distribution");
      
      // Clear form
      setHitlFeedback("");
      setSelectedReviewer("");
    }, 1000);
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

        {/* Enhanced Query Processing Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Query Processing */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-accent" />
                Live Query Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{currentUser.name}</span>
                <Badge variant="outline" className="text-xs">{currentUser.role}</Badge>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your question about financial assistance..."
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  className="bg-muted/10 border-muted/20"
                />
                <Button 
                  onClick={processQuery}
                  disabled={queryProcessing || !currentQuery.trim()}
                  variant="hero"
                  size="sm"
                >
                  {queryProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Sample Query Buttons */}
              <div className="grid grid-cols-1 gap-2">
                {sampleQueries.slice(0, 2).map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentQuery(query)}
                    className="justify-start text-left h-auto p-2 text-xs"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{query}</span>
                  </Button>
                ))}
              </div>

              {/* Processing Results */}
              {processingResults && (
                <div className="space-y-4 p-4 bg-muted/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Confidence: {processingResults.confidence}%</Badge>
                    <Badge variant="outline">{processingResults.processingTime}</Badge>
                    {processingResults.requiresReview && (
                      <Badge variant="secondary" className="text-warning">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Needs Review
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-foreground leading-relaxed">
                    {processingResults.initialResponse}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Sources:</p>
                    {processingResults.sources.map((source: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{source.title}</span>
                          <span className="text-muted-foreground">- {source.section}</span>
                          {source.flagged && (
                            <AlertTriangle className="w-3 h-3 text-warning" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {source.confidence}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* HITL Review Section */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-warning" />
                Human-in-the-Loop Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {processingResults?.requiresReview ? (
                <>
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium">Review Required</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This response requires human validation due to policy complexity or conflicting sources.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Assign Reviewer
                      </label>
                      <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                        <SelectTrigger className="bg-muted/10 border-muted/20">
                          <SelectValue placeholder="Select reviewer..." />
                        </SelectTrigger>
                        <SelectContent>
                          {reviewers.map((reviewer) => (
                            <SelectItem key={reviewer.id} value={reviewer.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{reviewer.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {reviewer.role} • {reviewer.expertise}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Review Feedback
                      </label>
                      <Textarea
                        placeholder="Provide your review and any corrections..."
                        value={hitlFeedback}
                        onChange={(e) => setHitlFeedback(e.target.value)}
                        className="bg-muted/10 border-muted/20 min-h-20"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={submitFeedback}
                        disabled={!hitlFeedback.trim() || !selectedReviewer}
                        variant="default"
                        size="sm"
                        className="flex-1"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Approve & Submit
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Process a query to see HITL review options</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Final Report & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Final Report */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileOutput className="w-6 h-6 text-success" />
                Final Output Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {finalReport ? (
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-semibold text-success">Query Approved</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Query:</strong> {finalReport.originalQuery}
                      </div>
                      <div>
                        <strong>Final Confidence:</strong> {finalReport.confidence}%
                      </div>
                      <div>
                        <strong>Reviewed by:</strong> {finalReport.reviewer?.name} ({finalReport.reviewer?.role})
                      </div>
                      <div>
                        <strong>Total Processing Time:</strong> {finalReport.totalTime}
                      </div>
                      <div>
                        <strong>Human Feedback:</strong>
                        <p className="mt-1 p-2 bg-muted/10 rounded text-xs">{finalReport.humanReview}</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <FileOutput className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileOutput className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Complete HITL review to generate final report</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Logs */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-accent" />
                System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {logs.length > 0 ? logs.map((log) => (
                  <div key={log.id} className="p-3 bg-muted/5 rounded-lg border border-muted/10 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          log.type === "system" ? "default" :
                          log.type === "query" ? "secondary" :
                          log.type === "ai" ? "outline" :
                          log.type === "hitl" ? "secondary" : "default"
                        } className="text-xs">
                          {log.type.toUpperCase()}
                        </Badge>
                        <span className="text-muted-foreground">{log.user}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground">{log.message}</p>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No logs yet. Start the demo to see system activity.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Orchestration;