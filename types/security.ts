export interface Vulnerability {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  line?: number;
  recommendation: string;
}

export interface SecurityReport {
  contractAddress: string;
  riskScore: number;
  vulnerabilities: Vulnerability[];
  aiAnalysis?: string;
}

export interface MonitoredContract {
  address: string;
  name: string;
  riskScore: number;
  lastChecked: string;
}
