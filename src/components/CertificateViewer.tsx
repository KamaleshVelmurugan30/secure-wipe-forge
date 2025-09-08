import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Download, FileJson, FileText, Shield, CheckCircle, Clock, HardDrive } from "lucide-react";

const sampleCertificate = {
  schema: "https://example.org/securewipe/v1",
  certificate_id: "swc-2025-09-08-ABC123",
  device: {
    model: "Samsung 980 Pro",
    serial: "S6B2NS0R123456A",
    type: "NVMe SSD", 
    capacity_bytes: 2000398934016,
    capacity_gb: "2TB"
  },
  nist_category: "Purge",
  algorithm: "NVMe Sanitize (Block Erase)",
  hpa_dco_removed: false,
  start_time_utc: "2025-09-08T14:05:00Z",
  end_time_utc: "2025-09-08T14:07:42Z",
  verification: {
    mode: "sample",
    percent: 5,
    result: "pass",
    blocks_verified: 102400,
    errors: 0
  },
  run_log_sha256: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
  signing: {
    sig_alg: "RSA-PSS-SHA256",
    pkcs7_detached: "certificate.json.p7s",
    ca_verified: true,
    timestamp_verified: true
  },
  compliance: {
    nist_sp_800_88: "Rev.1 Compliant",
    iso_iec_27040: "Aligned",
    method_rationale: "Block erase provides cryptographic level sanitization per NIST guidelines"
  }
};

export const CertificateViewer = () => {
  const [selectedCert] = useState(sampleCertificate);

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(0)} GB`;
  };

  const formatDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationMs = endTime - startTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-gradient-security rounded-full shadow-security">
          <Eye className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Certificate Viewer</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Detailed view of verified data sanitization certificates with compliance information.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-success rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-foreground" />
              </div>
              <div>
                <CardTitle>Certificate {selectedCert.certificate_id}</CardTitle>
                <CardDescription>Verified sanitization certificate</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="signature">Signature</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Device Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-primary" />
                    Device Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Model</span>
                        <p className="font-medium text-foreground">{selectedCert.device.model}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Serial Number</span>
                        <p className="font-mono text-foreground">{selectedCert.device.serial}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Type</span>
                        <p className="font-medium text-foreground">{selectedCert.device.type}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Capacity</span>
                        <p className="font-medium text-foreground">
                          {selectedCert.device.capacity_gb} ({formatBytes(selectedCert.device.capacity_bytes)})
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sanitization Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Sanitization Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">{selectedCert.nist_category}</div>
                      <p className="text-sm text-muted-foreground">NIST Category</p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-success">{selectedCert.verification.result.toUpperCase()}</div>
                      <p className="text-sm text-muted-foreground">Verification</p>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-foreground">
                        {formatDuration(selectedCert.start_time_utc, selectedCert.end_time_utc)}
                      </div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Algorithm</span>
                      <p className="font-medium text-foreground">{selectedCert.algorithm}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Rationale</span>
                      <p className="text-sm text-foreground">{selectedCert.compliance.method_rationale}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {selectedCert.compliance.nist_sp_800_88}
                    </Badge>
                    <Badge variant="secondary">
                      <Shield className="w-3 h-3 mr-1" />
                      {selectedCert.compliance.iso_iec_27040}
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Timestamp Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Execution Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Time:</span>
                          <span className="font-mono">{new Date(selectedCert.start_time_utc).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End Time:</span>
                          <span className="font-mono">{new Date(selectedCert.end_time_utc).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-mono">{formatDuration(selectedCert.start_time_utc, selectedCert.end_time_utc)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Verification Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mode:</span>
                          <span className="capitalize">{selectedCert.verification.mode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Coverage:</span>
                          <span>{selectedCert.verification.percent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Blocks Verified:</span>
                          <span className="font-mono">{selectedCert.verification.blocks_verified.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Errors:</span>
                          <span className="text-success font-medium">{selectedCert.verification.errors}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Run Log Hash</h4>
                    <div className="p-3 bg-muted rounded-lg">
                      <code className="text-xs font-mono break-all text-foreground">{selectedCert.run_log_sha256}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>NIST SP 800-88 Rev.1</CardTitle>
                    <CardDescription>Compliance with NIST sanitization standards</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium text-success">Fully Compliant</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><strong>Category:</strong> {selectedCert.nist_category}</p>
                      <p><strong>Method:</strong> {selectedCert.algorithm}</p>
                      <p><strong>Media Type:</strong> Solid State Drive (SSD)</p>
                      <p><strong>Verification:</strong> Required sampling performed</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ISO/IEC 27040</CardTitle>
                    <CardDescription>Storage security standard alignment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium text-success">{selectedCert.compliance.iso_iec_27040}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><strong>Control Selection:</strong> Appropriate for media type</p>
                      <p><strong>Risk Assessment:</strong> Cryptographic level sanitization</p>
                      <p><strong>Documentation:</strong> Complete audit trail</p>
                      <p><strong>Verification:</strong> Independent validation performed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="signature" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Digital Signature Verification</CardTitle>
                  <CardDescription>PKCS#7 cryptographic signature details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Signature Algorithm</h4>
                        <div className="p-3 bg-muted rounded-lg">
                          <code className="text-sm font-mono text-foreground">{selectedCert.signing.sig_alg}</code>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Verification Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm">CA Chain Verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm">Timestamp Validated</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm">Signature Integrity Confirmed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Certificate Authority</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Issuer:</strong> SecureWipe CA v2.1</p>
                          <p><strong>Valid From:</strong> 2024-01-01</p>
                          <p><strong>Valid Until:</strong> 2026-12-31</p>
                          <p><strong>Key Length:</strong> RSA 4096-bit</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Signature File</h4>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                          <FileJson className="w-4 h-4 text-primary" />
                          <span className="text-sm font-mono">{selectedCert.signing.pkcs7_detached}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};