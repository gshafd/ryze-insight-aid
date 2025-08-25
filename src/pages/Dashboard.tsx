import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  BarChart,
  Database,
  FileText,
  MessageCircle,
  Brain,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Send
} from "lucide-react";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryResult, setQueryResult] = useState<any>(null);

  const stats = [
    {
      title: "Documents Processed",
      value: "847",
      icon: FileText,
      trend: "+12%",
      color: "text-success"
    },
    {
      title: "Active Queries Today",
      value: "156",
      icon: MessageCircle,
      trend: "+8%",
      color: "text-primary"
    },
    {
      title: "Average Response Time",
      value: "0.8s",
      icon: Clock,
      trend: "-15%",
      color: "text-accent"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      icon: CheckCircle,
      trend: "Stable",
      color: "text-success"
    }
  ];

  const recentQueries = [
    {
      query: "What are the eligibility requirements for emergency aid?",
      confidence: 96,
      sources: 4,
      timestamp: "2 minutes ago",
      status: "completed"
    },
    {
      query: "How do I apply for student loan forgiveness?",
      confidence: 89,
      sources: 6,
      timestamp: "5 minutes ago", 
      status: "completed"
    },
    {
      query: "What documentation is needed for hardship applications?",
      confidence: 94,
      sources: 3,
      timestamp: "8 minutes ago",
      status: "completed"
    }
  ];

  const documentSources = [
    { name: "Financial Aid Policies", count: 245, status: "synced" },
    { name: "Application Forms", count: 189, status: "syncing" },
    { name: "Eligibility Guidelines", count: 167, status: "synced" },
    { name: "Federal Regulations", count: 156, status: "synced" },
    { name: "Emergency Assistance", count: 90, status: "synced" }
  ];

  const handleSubmitQuery = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setQueryResult({
        answer: "Based on the financial assistance policies, students must demonstrate financial need through FAFSA documentation, maintain a minimum 2.0 GPA, and be enrolled at least half-time. Emergency assistance requires additional documentation of the specific financial crisis.",
        confidence: 92,
        sources: [
          { title: "Financial Aid Policy Manual", section: "Section 4.2", relevance: 95 },
          { title: "Emergency Assistance Guidelines", section: "Eligibility", relevance: 88 },
          { title: "Student Handbook 2024", section: "Financial Aid", relevance: 76 }
        ],
        processing_time: "0.7s"
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <main className="pt-20 min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              AI Agent Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor system performance and interact with your AI agent
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-sm font-medium ${stat.color}`}>
                        {stat.trend} from last week
                      </p>
                    </div>
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Query Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-primary/20 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-accent" />
                  Natural Language Query
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask any question about financial assistance..."
                      className="flex-1 bg-muted/10 border-muted/20"
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmitQuery()}
                    />
                    <Button 
                      onClick={handleSubmitQuery}
                      disabled={isProcessing || !query.trim()}
                      variant="hero"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {queryResult && (
                    <div className="space-y-4 p-4 bg-muted/5 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">
                          Confidence: {queryResult.confidence}%
                        </Badge>
                        <Badge variant="outline">
                          {queryResult.processing_time}
                        </Badge>
                      </div>
                      
                      <p className="text-foreground leading-relaxed">
                        {queryResult.answer}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground">Sources:</p>
                        {queryResult.sources.map((source: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded text-sm">
                            <div>
                              <span className="font-medium">{source.title}</span>
                              <span className="text-muted-foreground ml-2">- {source.section}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {source.relevance}% relevant
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Queries */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Recent Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQueries.map((item, index) => (
                    <div key={index} className="p-4 bg-muted/5 rounded-lg border border-muted/20">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm text-foreground font-medium">"{item.query}"</p>
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.confidence}% confidence
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.sources} sources
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Sources */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-accent" />
                  Document Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground">{source.count} documents</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {source.status === "synced" ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        )}
                        <span className={`text-xs ${source.status === "synced" ? "text-success" : "text-primary"}`}>
                          {source.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-success" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>CPU Usage</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Storage</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;