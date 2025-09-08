import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link2, Search, CheckCircle, ExternalLink, Copy, Hash, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlockchainRecord {
  certificateId: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  certHash: string;
  gasUsed: number;
  status: 'confirmed' | 'pending' | 'failed';
  metadata: {
    deviceModel: string;
    method: string;
    operator: string;
  };
}

const sampleRecords: BlockchainRecord[] = [
  {
    certificateId: 'TW-2025-001',
    transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    blockNumber: 18745632,
    timestamp: '2025-01-08T14:30:45Z',
    certHash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    gasUsed: 21000,
    status: 'confirmed',
    metadata: {
      deviceModel: 'Samsung 980 Pro',
      method: 'NVMe Sanitize',
      operator: 'operator-001'
    }
  },
  {
    certificateId: 'TW-2025-002',
    transactionHash: '0x9876543210fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
    blockNumber: 18745633,
    timestamp: '2025-01-08T15:15:22Z',
    certHash: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1',
    gasUsed: 21000,
    status: 'confirmed',
    metadata: {
      deviceModel: 'WD Black SN750',
      method: 'Crypto Erase',
      operator: 'operator-002'
    }
  },
  {
    certificateId: 'TW-2025-003',
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    blockNumber: 0,
    timestamp: '2025-01-08T15:45:10Z',
    certHash: 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1b2',
    gasUsed: 0,
    status: 'pending',
    metadata: {
      deviceModel: 'Seagate Exos 7E10',
      method: 'ATA Secure Erase',
      operator: 'operator-001'
    }
  }
];

export const BlockchainVerification = () => {
  const [records] = useState<BlockchainRecord[]>(sampleRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const { toast } = useToast();

  const filteredRecords = records.filter(record => 
    record.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.transactionHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.metadata.deviceModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Hash copied successfully",
    });
  };

  const verifyOnChain = () => {
    // Simulate blockchain verification
    setTimeout(() => {
      const mockResult = {
        isValid: true,
        blockNumber: 18745632,
        timestamp: '2025-01-08T14:30:45Z',
        confirmations: 23,
        gasUsed: 21000
      };
      setVerificationResult(mockResult);
      toast({
        title: "Verification Complete",
        description: "Certificate hash verified on blockchain",
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success/10 text-success">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-gradient-blockchain rounded-full shadow-security">
          <Link2 className="w-8 h-8 text-blockchain-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Blockchain Verification</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Immutable, tamper-proof logging of sanitization certificates on Ethereum-compatible blockchain.
        </p>
      </div>

      {/* Verification Tool */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Certificate Hash Verification
          </CardTitle>
          <CardDescription>
            Verify a certificate hash against the blockchain registry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Textarea
              placeholder="Enter certificate SHA-256 hash or transaction hash..."
              value={verifyHash}
              onChange={(e) => setVerifyHash(e.target.value)}
              className="flex-1"
              rows={2}
            />
            <Button 
              variant="blockchain" 
              onClick={verifyOnChain}
              disabled={!verifyHash}
              className="self-start"
            >
              <Search className="w-4 h-4 mr-2" />
              Verify
            </Button>
          </div>

          {verificationResult && (
            <Card className="border-success bg-success/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-success">Verification Successful</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Block Number:</span>
                        <p className="font-mono text-foreground">{verificationResult.blockNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Confirmations:</span>
                        <p className="text-foreground">{verificationResult.confirmations}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timestamp:</span>
                        <p className="text-foreground">{new Date(verificationResult.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gas Used:</span>
                        <p className="text-foreground">{verificationResult.gasUsed.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Blockchain Registry</CardTitle>
          <CardDescription>All registered sanitization certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by certificate ID, transaction hash, or device..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.certificateId} className="shadow-elegant hover:shadow-security transition-smooth">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-blockchain rounded-lg">
                      <Link2 className="w-5 h-5 text-blockchain-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{record.certificateId}</h3>
                      <p className="text-sm text-muted-foreground">
                        {record.metadata.deviceModel} • {record.metadata.method}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(record.status)}
                    {record.status === 'confirmed' && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Explorer
                      </Button>
                    )}
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Transaction Hash</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded flex-1 truncate">
                          {record.transactionHash}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.transactionHash)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Certificate Hash</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded flex-1 truncate">
                          {record.certHash}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.certHash)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Block Number:</span>
                        <p className="font-mono text-foreground">
                          {record.blockNumber > 0 ? record.blockNumber.toLocaleString() : 'Pending'}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gas Used:</span>
                        <p className="text-foreground">
                          {record.gasUsed > 0 ? record.gasUsed.toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timestamp:</span>
                        <p className="text-foreground">{new Date(record.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Operator:</span>
                        <p className="text-foreground">{record.metadata.operator}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contract Information */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            Smart Contract Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Contract Address</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-muted px-3 py-2 rounded flex-1">
                    0x742d35Cc6634C0532925a3b8D36C2A1f2BCB4153
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard('0x742d35Cc6634C0532925a3b8D36C2A1f2BCB4153')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Network</span>
                <p className="text-foreground">Polygon (MATIC) Mainnet</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Contract Version</span>
                <p className="text-foreground">TrustWipe Registry v1.2.0</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Total Certificates</span>
                <p className="text-foreground">1,247 registered</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium text-foreground mb-2">Verification Instructions</h4>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>1. Obtain the certificate JSON file and compute SHA-256 hash</li>
              <li>2. Query the contract using the certificate ID or hash</li>
              <li>3. Compare the on-chain hash with your computed hash</li>
              <li>4. Verify the timestamp and block confirmation</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};