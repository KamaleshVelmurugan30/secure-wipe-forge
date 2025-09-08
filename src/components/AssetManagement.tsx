import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HardDrive, Plus, Search, Filter, Play, Pause, CheckCircle, AlertCircle, Monitor, Smartphone, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Asset {
  id: string;
  assetTag: string;
  type: 'desktop' | 'laptop' | 'server' | 'mobile';
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: 'intake' | 'queued' | 'wiping' | 'verified' | 'released' | 'failed';
  drives: Drive[];
  assignedTo?: string;
  intakeDate: string;
  recyclerDestination?: string;
}

interface Drive {
  id: string;
  path: string;
  model: string;
  serial: string;
  type: 'HDD' | 'SSD' | 'NVMe' | 'Flash';
  capacity: string;
  status: 'detected' | 'wiping' | 'verified' | 'failed';
  method?: string;
  progress?: number;
}

const sampleAssets: Asset[] = [
  {
    id: '1',
    assetTag: 'DT-001-2025',
    type: 'desktop',
    manufacturer: 'Dell',
    model: 'OptiPlex 7090',
    serialNumber: 'DL7090-ABC123',
    status: 'intake',
    drives: [
      {
        id: 'd1',
        path: '/dev/nvme0n1',
        model: 'Samsung 980 Pro',
        serial: 'S6B2NS0R123456',
        type: 'NVMe',
        capacity: '1TB',
        status: 'detected'
      }
    ],
    intakeDate: '2025-01-08T10:30:00Z',
    assignedTo: 'operator-001'
  },
  {
    id: '2',
    assetTag: 'LT-002-2025',
    type: 'laptop',
    manufacturer: 'HP',
    model: 'EliteBook 850',
    serialNumber: 'HP850-XYZ789',
    status: 'wiping',
    drives: [
      {
        id: 'd2',
        path: '/dev/nvme0n1',
        model: 'WD Black SN750',
        serial: 'WD750-456789',
        type: 'NVMe',
        capacity: '512GB',
        status: 'wiping',
        method: 'Crypto Erase',
        progress: 67
      }
    ],
    intakeDate: '2025-01-08T09:15:00Z',
    assignedTo: 'operator-002'
  },
  {
    id: '3',
    assetTag: 'SV-003-2025',
    type: 'server',
    manufacturer: 'Lenovo',
    model: 'ThinkSystem SR650',
    serialNumber: 'LS650-789ABC',
    status: 'verified',
    drives: [
      {
        id: 'd3a',
        path: '/dev/sda',
        model: 'Seagate Exos 7E10',
        serial: 'ST10TB-001',
        type: 'HDD',
        capacity: '10TB',
        status: 'verified',
        method: 'ATA Secure Erase'
      },
      {
        id: 'd3b',
        path: '/dev/sdb',
        model: 'Seagate Exos 7E10',
        serial: 'ST10TB-002',
        type: 'HDD',
        capacity: '10TB',
        status: 'verified',
        method: 'ATA Secure Erase'
      }
    ],
    intakeDate: '2025-01-07T14:20:00Z',
    recyclerDestination: 'GreenTech Recycling'
  }
];

export const AssetManagement = () => {
  const [assets, setAssets] = useState<Asset[]>(sampleAssets);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const filteredAssets = assets.filter(asset => {
    const matchesFilter = filter === 'all' || asset.status === filter;
    const matchesSearch = searchTerm === '' || 
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'desktop': return Monitor;
      case 'laptop': return Monitor;
      case 'server': return Server;
      case 'mobile': return Smartphone;
      default: return HardDrive;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'intake': return 'bg-blue-100 text-blue-800';
      case 'queued': return 'bg-yellow-100 text-yellow-800';
      case 'wiping': return 'bg-purple-100 text-purple-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'released': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startWipeOperation = (asset: Asset) => {
    setAssets(prev => prev.map(a => 
      a.id === asset.id 
        ? { ...a, status: 'wiping', drives: a.drives.map(d => ({ ...d, status: 'wiping', progress: 0 })) }
        : a
    ));
    
    toast({
      title: "Wipe Operation Started",
      description: `IEEE 2883 compliant sanitization initiated for ${asset.assetTag}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-gradient-trustwipe rounded-full shadow-security">
          <HardDrive className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Asset Management</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Track and manage IT assets through the complete sanitization lifecycle.
        </p>
      </div>

      {/* Controls */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Asset Inventory</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="trustwipe">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register New Asset</DialogTitle>
                  <DialogDescription>
                    Add a new IT asset to the sanitization queue
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input placeholder="Asset Tag (e.g., DT-001-2025)" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Asset Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="server">Server</SelectItem>
                      <SelectItem value="mobile">Mobile Device</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Manufacturer" />
                  <Input placeholder="Model" />
                  <Input placeholder="Serial Number" />
                  <Button variant="trustwipe" className="w-full">Register Asset</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                <SelectItem value="intake">Intake</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="wiping">Wiping</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="released">Released</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Asset List */}
      <div className="space-y-4">
        {filteredAssets.map((asset) => {
          const AssetIcon = getAssetIcon(asset.type);
          return (
            <Card key={asset.id} className="shadow-elegant hover:shadow-security transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-trustwipe rounded-lg">
                      <AssetIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{asset.assetTag}</h3>
                        <Badge className={getStatusColor(asset.status)}>
                          {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {asset.manufacturer} {asset.model} • {asset.serialNumber}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{asset.drives.length} drive(s)</span>
                        {asset.assignedTo && <span>Operator: {asset.assignedTo}</span>}
                        {asset.recyclerDestination && <span>→ {asset.recyclerDestination}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {asset.status === 'intake' && (
                      <Button 
                        variant="trustwipe" 
                        size="sm"
                        onClick={() => startWipeOperation(asset)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Wipe
                      </Button>
                    )}
                    {asset.status === 'wiping' && (
                      <Button variant="outline" size="sm">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Drive Information */}
                <div className="mt-4 space-y-2">
                  {asset.drives.map((drive) => (
                    <div key={drive.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <HardDrive className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {drive.model} ({drive.capacity})
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {drive.type} • {drive.serial}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {drive.progress !== undefined && (
                          <div className="text-xs text-muted-foreground">
                            {drive.progress}%
                          </div>
                        )}
                        {drive.method && (
                          <Badge variant="secondary" className="text-xs">
                            {drive.method}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1">
                          {drive.status === 'verified' ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : drive.status === 'failed' ? (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          ) : drive.status === 'wiping' ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <div className="w-4 h-4 bg-muted-foreground rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="text-center py-12">
            <HardDrive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">No Assets Found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'No assets match your search criteria.' : 'Register your first asset to get started.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};