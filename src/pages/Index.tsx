import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileCheck, Upload, Eye, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { CertificateUpload } from "@/components/CertificateUpload";
import { CertificateViewer } from "@/components/CertificateViewer";
import { ComplianceMapping } from "@/components/ComplianceMapping";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-elegant sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-security rounded-lg shadow-security">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SecureWipe Suite</h1>
                <p className="text-sm text-muted-foreground">Certificate Verifier & Compliance Dashboard</p>
              </div>
            </div>
            <Button variant="security" className="shadow-security">
              <Upload className="w-4 h-4" />
              Upload Certificate
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 bg-card shadow-elegant">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
              <Upload className="w-4 h-4 mr-2" />
              Upload & Verify
            </TabsTrigger>
            <TabsTrigger value="viewer" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
              <Eye className="w-4 h-4 mr-2" />
              Certificate Viewer
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
              <FileCheck className="w-4 h-4 mr-2" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center space-y-4 py-8">
              <div className="inline-flex p-4 bg-gradient-security rounded-full shadow-security">
                <Shield className="w-12 h-12 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">NIST SP 800-88 Rev.1 Compliant</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Verify data sanitization certificates with cryptographic signatures and validate compliance 
                with NIST standards for secure data destruction.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified Certificates</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                  <Shield className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">99.8%</div>
                  <p className="text-xs text-muted-foreground">NIST SP 800-88 Rev.1</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">23</div>
                  <p className="text-xs text-muted-foreground">Awaiting signature validation</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  Recent Certificate Activity
                </CardTitle>
                <CardDescription>Latest verified wipe certificates and compliance status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "swc-2025-001", device: "Samsung 980 Pro", method: "NVMe Sanitize", status: "verified", time: "2 minutes ago" },
                  { id: "swc-2025-002", device: "WD Black SN850", method: "Crypto Erase", status: "verified", time: "15 minutes ago" },
                  { id: "swc-2025-003", device: "Seagate Barracuda", method: "ATA Secure Erase", status: "verified", time: "1 hour ago" },
                ].map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-success rounded-lg">
                        <CheckCircle className="w-4 h-4 text-success-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{cert.device}</p>
                        <p className="text-sm text-muted-foreground">{cert.method} • {cert.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        Verified
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{cert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <CertificateUpload />
          </TabsContent>

          {/* Viewer Tab */}
          <TabsContent value="viewer">
            <CertificateViewer />
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <ComplianceMapping />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;