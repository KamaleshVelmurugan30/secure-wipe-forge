import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileCheck, Shield, AlertCircle, CheckCircle, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerificationResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export const CertificateUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setVerificationResult(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          simulateVerification(file);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  }, []);

  const simulateVerification = async (file: File) => {
    setIsVerifying(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isValidCertificate = file.name.includes('.json') || file.name.includes('cert');
    const hasValidSignature = Math.random() > 0.1; // 90% success rate for demo
    
    if (!isValidCertificate) {
      setVerificationResult({
        status: 'error',
        message: 'Invalid certificate format. Expected JSON or P7S file.',
      });
    } else if (!hasValidSignature) {
      setVerificationResult({
        status: 'error',
        message: 'PKCS#7 signature verification failed. Certificate may be tampered with or signed by untrusted CA.',
      });
    } else {
      setVerificationResult({
        status: 'success',
        message: 'Certificate verified successfully. NIST SP 800-88 compliant sanitization confirmed.',
        details: {
          certificateId: 'swc-2025-09-08-' + Math.random().toString(36).substr(2, 6),
          device: 'Samsung 980 Pro 2TB NVMe',
          method: 'NVMe Sanitize (Purge)',
          timestamp: new Date().toISOString(),
          verifiedBy: 'SecureWipe CA v2.1'
        }
      });
      
      toast({
        title: "Certificate Verified",
        description: "Data sanitization certificate has been successfully verified.",
        variant: "default",
      });
    }
    
    setIsVerifying(false);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setVerificationResult(null);
    setIsUploading(false);
    setIsVerifying(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-gradient-security rounded-full shadow-security">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Certificate Upload & Verification</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Upload JSON certificates with PKCS#7 signatures to verify data sanitization compliance.
        </p>
      </div>

      {/* Upload Area */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Secure Certificate Upload
          </CardTitle>
          <CardDescription>
            Drag and drop your certificate files (.json, .p7s) or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedFile ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
              <input
                type="file"
                accept=".json,.p7s,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="certificate-upload"
              />
              <label
                htmlFor="certificate-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="p-4 bg-muted rounded-full">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Upload Certificate</p>
                  <p className="text-sm text-muted-foreground">JSON, P7S, or PDF files accepted</p>
                </div>
                <Button variant="security" className="mt-2">
                  Choose Files
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <File className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={resetUpload}>
                  Remove
                </Button>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">Uploading...</span>
                    <span className="text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {/* Verification Status */}
              {isVerifying && (
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="animate-spin">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Verifying Certificate</p>
                    <p className="text-sm text-primary/80">Checking PKCS#7 signature and compliance...</p>
                  </div>
                </div>
              )}

              {/* Verification Result */}
              {verificationResult && (
                <Card className={`${
                  verificationResult.status === 'success' ? 'border-success bg-success/5' :
                  verificationResult.status === 'error' ? 'border-destructive bg-destructive/5' :
                  'border-warning bg-warning/5'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {verificationResult.status === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-success mt-0.5" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="font-medium text-foreground">{verificationResult.message}</p>
                        </div>
                        
                        {verificationResult.details && (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Certificate ID:</span>
                                <p className="font-mono text-foreground">{verificationResult.details.certificateId}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Device:</span>
                                <p className="text-foreground">{verificationResult.details.device}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Method:</span>
                                <p className="text-foreground">{verificationResult.details.method}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Verified By:</span>
                                <p className="text-foreground">{verificationResult.details.verifiedBy}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="secondary">NIST SP 800-88 Compliant</Badge>
                              <Badge variant="secondary">ISO/IEC 27040</Badge>
                              <Badge variant="secondary">PKCS#7 Verified</Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Verification Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-medium">Upload Certificate</h3>
              <p className="text-sm text-muted-foreground">Upload JSON certificate with PKCS#7 signature</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-medium">Validate Signature</h3>
              <p className="text-sm text-muted-foreground">Verify PKCS#7 signature against trusted CA</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-medium">Check Compliance</h3>
              <p className="text-sm text-muted-foreground">Verify NIST SP 800-88 method compliance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};