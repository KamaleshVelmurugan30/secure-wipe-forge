import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, Shield, AlertTriangle, CheckCircle, Book, Target } from "lucide-react";

const nistMethods = [
  {
    category: "Clear",
    description: "Logical sanitization using standard Read/Write commands",
    mediaTypes: ["HDD", "SSD", "Flash"],
    techniques: ["Single overwrite pass", "TRIM/UNMAP for SSDs", "Logical format"],
    verification: "Optional readback verification",
    useCase: "Internal reallocation, non-sensitive data"
  },
  {
    category: "Purge", 
    description: "Physical destruction of data with lab resources",
    mediaTypes: ["HDD", "SSD", "Flash", "Tape"],
    techniques: ["ATA Secure Erase", "NVMe Sanitize", "SCSI SANITIZE", "Cryptographic Erase"],
    verification: "Required verification sampling",
    useCase: "Controlled environments, regulatory compliance"
  },
  {
    category: "Destroy",
    description: "Physical destruction of storage media",
    mediaTypes: ["All"],
    techniques: ["Disintegration", "Pulverization", "Melting", "Incineration"],
    verification: "Visual inspection of destruction",
    useCase: "Highest security requirements, end-of-life"
  }
];

const isoControls = [
  {
    id: "A.8.3.2",
    title: "Disposal or reuse of equipment", 
    description: "Equipment containing storage media shall be verified to ensure sensitive data has been removed",
    implementation: "Certificate-based verification of sanitization before disposal/reuse"
  },
  {
    id: "A.11.2.7",
    title: "Secure disposal or reuse",
    description: "Items containing sensitive information shall be securely disposed of when no longer required",
    implementation: "NIST-compliant sanitization methods with cryptographic verification"
  },
  {
    id: "A.10.1.2", 
    title: "Key management",
    description: "Cryptographic keys shall be protected against unauthorized disclosure and modification",
    implementation: "Cryptographic Erase for FDE-enabled devices with key destruction evidence"
  }
];

const mediaMapping = [
  {
    type: "Hard Disk Drives (HDD)",
    nistCategory: "Clear: Overwrite • Purge: ATA Secure Erase",
    notes: "Remove HPA/DCO before sanitization. Enhanced Secure Erase preferred.",
    riskLevel: "Medium",
    color: "warning"
  },
  {
    type: "Solid State Drives (SSD)", 
    nistCategory: "Clear: TRIM + Overwrite • Purge: NVMe Sanitize/Crypto Erase",
    notes: "Prefer sanitize command or crypto erase. Wear leveling considerations.",
    riskLevel: "High",
    color: "destructive" 
  },
  {
    type: "Flash Memory (USB/SD)",
    nistCategory: "Clear: Overwrite • Purge: Controller-based erase",
    notes: "Controller-dependent. May require multiple methods for complete sanitization.",
    riskLevel: "High", 
    color: "destructive"
  },
  {
    type: "Optical Media",
    nistCategory: "Clear: Not applicable • Purge: Physical destruction only",
    notes: "Cannot be logically sanitized. Physical destruction required.",
    riskLevel: "N/A",
    color: "muted"
  }
];

export const ComplianceMapping = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-gradient-security rounded-full shadow-security">
          <FileCheck className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Compliance & Standards Mapping</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive mapping of sanitization methods to NIST SP 800-88 Rev.1 and ISO/IEC 27040 requirements.
        </p>
      </div>

      <Tabs defaultValue="nist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card shadow-elegant">
          <TabsTrigger value="nist" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            NIST SP 800-88
          </TabsTrigger>
          <TabsTrigger value="iso" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
            <Book className="w-4 h-4 mr-2" />
            ISO/IEC 27040
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-gradient-security data-[state=active]:text-primary-foreground">
            <Target className="w-4 h-4 mr-2" />
            Media Mapping
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nist" className="space-y-6">
          <div className="grid gap-6">
            {nistMethods.map((method) => (
              <Card key={method.category} className="shadow-elegant">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        method.category === 'Clear' ? 'bg-success/20 text-success' :
                        method.category === 'Purge' ? 'bg-primary/20 text-primary' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {method.category === 'Clear' ? <CheckCircle className="w-5 h-5" /> :
                         method.category === 'Purge' ? <Shield className="w-5 h-5" /> :
                         <AlertTriangle className="w-5 h-5" />}
                      </div>
                      NIST {method.category}
                    </CardTitle>
                    <Badge variant="secondary">{method.category}</Badge>
                  </div>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Supported Media Types</h4>
                        <div className="flex flex-wrap gap-2">
                          {method.mediaTypes.map((type) => (
                            <Badge key={type} variant="outline">{type}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Techniques</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {method.techniques.map((technique, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {technique}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Verification</h4>
                        <p className="text-sm text-muted-foreground">{method.verification}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Use Case</h4>
                        <p className="text-sm text-muted-foreground">{method.useCase}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="iso" className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>ISO/IEC 27040:2015 Storage Security Controls</CardTitle>
              <CardDescription>
                Relevant controls for secure data sanitization and storage lifecycle management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {isoControls.map((control) => (
                  <div key={control.id} className="border-l-4 border-primary pl-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{control.id}</Badge>
                      <h4 className="font-medium text-foreground">{control.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{control.description}</p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm text-foreground"><strong>Implementation:</strong> {control.implementation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
              <CardDescription>Key requirements for audit and certification purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Document sanitization policy and procedures",
                  "Maintain inventory of storage devices requiring sanitization", 
                  "Implement appropriate sanitization method selection",
                  "Perform verification and document results",
                  "Maintain certificates and audit trail",
                  "Train personnel on procedures and standards",
                  "Regular review and update of sanitization methods"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="space-y-4">
            {mediaMapping.map((media, idx) => (
              <Card key={idx} className="shadow-elegant">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{media.type}</CardTitle>
                    <Badge variant={media.color as any}>{media.riskLevel} Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">NIST Methods</h4>
                    <p className="text-sm text-muted-foreground">{media.nistCategory}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Implementation Notes</h4>
                    <p className="text-sm text-muted-foreground">{media.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Decision Matrix</CardTitle>
              <CardDescription>Selecting appropriate sanitization method based on media type and security requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Media Type</th>
                        <th className="text-left p-3 font-medium">Internal Use</th>
                        <th className="text-left p-3 font-medium">External Release</th>
                        <th className="text-left p-3 font-medium">High Security</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b">
                        <td className="p-3 font-medium">HDD</td>
                        <td className="p-3">Clear (Overwrite)</td>
                        <td className="p-3">Purge (Secure Erase)</td>
                        <td className="p-3">Destroy</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">SSD/NVMe</td>
                        <td className="p-3">Clear (TRIM + Overwrite)</td>
                        <td className="p-3">Purge (Sanitize/Crypto Erase)</td>
                        <td className="p-3">Destroy</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Flash Media</td>
                        <td className="p-3">Clear (Overwrite)</td>
                        <td className="p-3">Purge (Controller Erase)</td>
                        <td className="p-3">Destroy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};