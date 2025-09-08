import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileCheck, Upload, Eye, CheckCircle, AlertTriangle, Users, Link2, Server, HardDrive } from "lucide-react";
import { CertificateUpload } from "@/components/CertificateUpload";
import { CertificateViewer } from "@/components/CertificateViewer";
import { ComplianceMapping } from "@/components/ComplianceMapping";
import { AssetManagement } from "@/components/AssetManagement";
import { BlockchainVerification } from "@/components/BlockchainVerification";
import { RecyclerIntegration } from "@/components/RecyclerIntegration";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-elegant sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-trustwipe rounded-lg shadow-security">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TrustWipe Platform</h1>
                <p className="text-sm text-muted-foreground">Enterprise Data Sanitization & Asset Recycling</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Link2 className="w-4 h-4 mr-2" />
                Blockchain Explorer
              </Button>
              <Button variant="trustwipe" className="shadow-security">
                <Upload className="w-4 h-4" />
                New Wipe Job
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 bg-card shadow-elegant">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-trustwipe data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-gradient-trustwipe data-[state=active]:text-primary-foreground">
              <HardDrive className="w-4 h-4 mr-2" />
              Assets
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-gradient-trustwipe data-[state=active]:text-primary-foreground">
              <Link2 className="w-4 h-4 mr-2" />
              Blockchain
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-gradient-trustwipe data-[state=active]:text-primary-foreground">
              <FileCheck className="w-4 h-4 mr-2" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="recyclers" className="data-[state=active]:bg-gradient-trustwipe data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" />
              Recyclers
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-gradient-trustwipe data-[state=active]:text-primary-foreground">
              <Eye className="w-4 h-4 mr-2" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center space-y-4 py-8">
              <div className="inline-flex p-4 bg-gradient-trustwipe rounded-full shadow-security">
                <Shield className="w-12 h-12 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">IEEE 2883-2022 & NIST SP 800-88 Compliant</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade data sanitization platform with blockchain-backed tamper-proof logging 
                for trustworthy IT asset recycling and compliance verification.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assets Processed</CardTitle>
                  <HardDrive className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blockchain Verified</CardTitle>
                  <Link2 className="h-4 w-4 text-blockchain" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blockchain">1,244</div>
                  <p className="text-xs text-muted-foreground">99.8% success rate</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recycler Partners</CardTitle>
                  <Users className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">12</div>
                  <p className="text-xs text-muted-foreground">Active integrations</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant hover:shadow-security transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">100%</div>
                  <p className="text-xs text-muted-foreground">IEEE 2883 & NIST 800-88</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary" />
                    Recent Wipe Operations
                  </CardTitle>
                  <CardDescription>Latest sanitization jobs and their status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { 
                      id: "TW-2025-001", 
                      asset: "Dell OptiPlex 7090", 
                      device: "Samsung 980 Pro 1TB", 
                      method: "NVMe Sanitize", 
                      status: "blockchain_verified", 
                      time: "5 minutes ago",
                      blockHash: "0x1a2b3c..."
                    },
                    { 
                      id: "TW-2025-002", 
                      asset: "HP EliteBook 850", 
                      device: "WD Black SN750", 
                      method: "Crypto Erase", 
                      status: "completed", 
                      time: "23 minutes ago",
                      blockHash: null
                    },
                    { 
                      id: "TW-2025-003", 
                      asset: "Lenovo ThinkPad P1", 
                      device: "Seagate Barracuda 2TB", 
                      method: "ATA Secure Erase", 
                      status: "in_progress", 
                      time: "1 hour ago",
                      blockHash: null
                    },
                  ].map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          job.status === 'blockchain_verified' ? 'bg-gradient-blockchain' :
                          job.status === 'completed' ? 'bg-gradient-success' :
                          'bg-gradient-trustwipe'
                        }`}>
                          {job.status === 'blockchain_verified' ? <Link2 className="w-4 h-4 text-blockchain-foreground" /> :
                           job.status === 'completed' ? <CheckCircle className="w-4 h-4 text-success-foreground" /> :
                           <Server className="w-4 h-4 text-primary-foreground" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{job.asset}</p>
                          <p className="text-sm text-muted-foreground">{job.device} • {job.method}</p>
                          {job.blockHash && (
                            <p className="text-xs font-mono text-blockchain">Block: {job.blockHash}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'blockchain_verified' ? 'bg-blockchain/10 text-blockchain' :
                          job.status === 'completed' ? 'bg-success/10 text-success' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {job.status === 'blockchain_verified' ? 'Blockchain Verified' :
                           job.status === 'completed' ? 'Completed' :
                           'In Progress'}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{job.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Partner Activity
                  </CardTitle>
                  <CardDescription>Recycler integrations and certificate deliveries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { partner: "GreenTech Recycling", certificates: 45, lastDelivery: "2 hours ago", status: "active" },
                    { partner: "EcoWaste Solutions", certificates: 32, lastDelivery: "4 hours ago", status: "active" },
                    { partner: "TechReuse Corp", certificates: 28, lastDelivery: "1 day ago", status: "pending" },
                  ].map((partner, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{partner.partner}</p>
                        <p className="text-sm text-muted-foreground">{partner.certificates} certificates delivered</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          partner.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {partner.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{partner.lastDelivery}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets">
            <AssetManagement />
          </TabsContent>

          {/* Blockchain Tab */}
          <TabsContent value="blockchain">
            <BlockchainVerification />
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <CertificateUpload />
              <CertificateViewer />
            </div>
          </TabsContent>

          {/* Recyclers Tab */}
          <TabsContent value="recyclers">
            <RecyclerIntegration />
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