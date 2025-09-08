import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Settings, Send, CheckCircle, AlertCircle, ExternalLink, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecyclerPartner {
  id: string;
  name: string;
  contactEmail: string;
  apiEndpoint: string;
  status: 'active' | 'inactive' | 'pending';
  certificatesDelivered: number;
  lastDelivery: string;
  autoDelivery: boolean;
  webhookUrl?: string;
  apiKey: string;
  certificationLevel: 'R2' | 'e-Stewards' | 'ISO14001' | 'Other';
}

interface CertificateDelivery {
  id: string;
  certificateId: string;
  recyclerName: string;
  status: 'delivered' | 'pending' | 'failed';
  deliveryMethod: 'webhook' | 'email' | 'api';
  timestamp: string;
  retryCount: number;
}

const samplePartners: RecyclerPartner[] = [
  {
    id: '1',
    name: 'GreenTech Recycling',
    contactEmail: 'certificates@greentech-recycling.com',
    apiEndpoint: 'https://api.greentech-recycling.com/v1/certificates',
    status: 'active',
    certificatesDelivered: 245,
    lastDelivery: '2025-01-08T14:30:00Z',
    autoDelivery: true,
    webhookUrl: 'https://api.greentech-recycling.com/webhooks/trustwipe',
    apiKey: 'gt_live_ak_...',
    certificationLevel: 'R2'
  },
  {
    id: '2',
    name: 'EcoWaste Solutions',
    contactEmail: 'integration@ecowaste.com',
    apiEndpoint: 'https://partners.ecowaste.com/api/certificates',
    status: 'active',
    certificatesDelivered: 189,
    lastDelivery: '2025-01-08T12:15:00Z',
    autoDelivery: false,
    apiKey: 'ews_test_sk_...',
    certificationLevel: 'e-Stewards'
  },
  {
    id: '3',
    name: 'TechReuse Corp',
    contactEmail: 'compliance@techreuse.org',
    apiEndpoint: 'https://compliance.techreuse.org/certificates',
    status: 'pending',
    certificatesDelivered: 67,
    lastDelivery: '2025-01-07T16:45:00Z',
    autoDelivery: true,
    webhookUrl: 'https://compliance.techreuse.org/hooks/sanitization',
    apiKey: 'tr_pending_...',
    certificationLevel: 'ISO14001'
  }
];

const sampleDeliveries: CertificateDelivery[] = [
  {
    id: '1',
    certificateId: 'TW-2025-001',
    recyclerName: 'GreenTech Recycling',
    status: 'delivered',
    deliveryMethod: 'webhook',
    timestamp: '2025-01-08T14:32:15Z',
    retryCount: 0
  },
  {
    id: '2',
    certificateId: 'TW-2025-002',
    recyclerName: 'EcoWaste Solutions',
    status: 'pending',
    deliveryMethod: 'email',
    timestamp: '2025-01-08T15:16:30Z',
    retryCount: 1
  },
  {
    id: '3',
    certificateId: 'TW-2025-003',
    recyclerName: 'TechReuse Corp',
    status: 'failed',
    deliveryMethod: 'api',
    timestamp: '2025-01-08T13:22:45Z',
    retryCount: 3
  }
];

export const RecyclerIntegration = () => {
  const [partners, setPartners] = useState<RecyclerPartner[]>(samplePartners);
  const [deliveries] = useState<CertificateDelivery[]>(sampleDeliveries);
  const [selectedPartner, setSelectedPartner] = useState<RecyclerPartner | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'delivered': return 'bg-success/10 text-success';
      case 'failed': return 'bg-destructive/10 text-destructive';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCertificationColor = (level: string) => {
    switch (level) {
      case 'R2': return 'bg-blue-100 text-blue-800';
      case 'e-Stewards': return 'bg-green-100 text-green-800';
      case 'ISO14001': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const testConnection = (partner: RecyclerPartner) => {
    toast({
      title: "Testing Connection",
      description: `Sending test request to ${partner.name}...`,
    });

    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${partner.name} API endpoint.`,
      });
    }, 2000);
  };

  const retryDelivery = (deliveryId: string) => {
    toast({
      title: "Retrying Delivery",
      description: "Attempting to re-deliver certificate...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-gradient-success rounded-full shadow-success">
          <Users className="w-8 h-8 text-success-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Recycler Integration</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage certified recycling partners and automate certificate delivery workflows 
          for sustainable IT asset lifecycle management.
        </p>
      </div>

      {/* Partner Management */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Partner Directory
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="trustwipe">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Register New Recycling Partner</DialogTitle>
                  <DialogDescription>
                    Add a certified recycling partner to receive sanitization certificates
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Partner Name" />
                    <Input placeholder="Contact Email" />
                  </div>
                  <Input placeholder="API Endpoint URL" />
                  <Input placeholder="Webhook URL (optional)" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Certification Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="r2">R2 Certified</SelectItem>
                        <SelectItem value="e-stewards">e-Stewards</SelectItem>
                        <SelectItem value="iso14001">ISO 14001</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-delivery" />
                      <label htmlFor="auto-delivery" className="text-sm">Auto-delivery</label>
                    </div>
                  </div>
                  <Textarea placeholder="Notes (optional)" />
                  <Button variant="trustwipe" className="w-full">Register Partner</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partners.map((partner) => (
              <Card key={partner.id} className="border hover:shadow-md transition-smooth">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gradient-success rounded-lg">
                        <Users className="w-5 h-5 text-success-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{partner.name}</h3>
                          <Badge className={getStatusColor(partner.status)}>
                            {partner.status}
                          </Badge>
                          <Badge className={getCertificationColor(partner.certificationLevel)}>
                            {partner.certificationLevel}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{partner.contactEmail}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{partner.certificatesDelivered} certificates delivered</span>
                          <span>Last: {new Date(partner.lastDelivery).toLocaleDateString()}</span>
                          {partner.autoDelivery && <span>Auto-delivery enabled</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => testConnection(partner)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPartner(partner)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Deliveries */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Certificate Deliveries
          </CardTitle>
          <CardDescription>Recent certificate delivery status and logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-trustwipe rounded-lg">
                    {delivery.status === 'delivered' ? (
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    ) : delivery.status === 'failed' ? (
                      <AlertCircle className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Send className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{delivery.certificateId}</p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.recyclerName} • {delivery.deliveryMethod}
                    </p>
                    {delivery.retryCount > 0 && (
                      <p className="text-xs text-warning">Retry attempt {delivery.retryCount}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(delivery.timestamp).toLocaleString()}
                  </span>
                  {delivery.status === 'failed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => retryDelivery(delivery.id)}
                    >
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Integration Guidelines
          </CardTitle>
          <CardDescription>API endpoints and webhook specifications for partners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Certificate Delivery Methods</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-medium">Webhook (Recommended)</h5>
                  <p className="text-muted-foreground">Real-time HTTP POST with certificate data</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-medium">Email Notification</h5>
                  <p className="text-muted-foreground">Secure email with PDF and JSON attachments</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-medium">API Pull</h5>
                  <p className="text-muted-foreground">RESTful API for certificate retrieval</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Certification Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>R2 or e-Stewards certification preferred</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>ISO 14001 environmental management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Data security compliance (SOC 2, ISO 27001)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Secure API endpoints (HTTPS/TLS 1.3)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium text-foreground mb-3">Sample Webhook Payload</h4>
            <div className="bg-card p-4 rounded-lg border">
              <pre className="text-xs text-foreground overflow-x-auto">
{`{
  "event": "certificate.delivered",
  "certificate_id": "TW-2025-001",
  "asset_tag": "DT-001-2025",
  "device": {
    "model": "Samsung 980 Pro",
    "serial": "S6B2NS0R123456",
    "capacity": "1TB"
  },
  "sanitization": {
    "method": "NVMe Sanitize",
    "category": "Purge",
    "timestamp": "2025-01-08T14:30:45Z"
  },
  "verification": {
    "blockchain_hash": "0x1a2b3c4d...",
    "certificate_url": "https://verify.trustwipe.com/TW-2025-001",
    "pdf_url": "https://certs.trustwipe.com/TW-2025-001.pdf"
  }
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};