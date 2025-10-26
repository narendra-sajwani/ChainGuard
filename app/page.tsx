"use client";

import { useState } from "react";
import { useNotification } from "@blockscout/app-sdk";
import { Shield, AlertTriangle, CheckCircle, Loader } from "lucide-react";

interface SecurityReport {
  contractAddress: string;
  contractName: string;
  riskScore: number;
  vulnerabilities: Array<{
    type: string;
    severity: string;
    description: string;
    recommendation: string;
  }>;
  aiAnalysis: string;
  isVerified: boolean;
}

export default function Home() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SecurityReport | null>(null);
  const { openTxToast } = useNotification();

  const analyzeContract = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractAddress: address })
      });
      
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskBg = (score: number) => {
    if (score >= 70) return 'bg-red-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-10 h-10 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-900">ChainGuard</h1>
        </div>
        <p className="text-gray-600 text-lg">
          AI-Powered Smart Contract Security Monitor
        </p>
      </div>

      {/* Analysis Input */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter contract address (0x...)"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={analyzeContract}
              disabled={loading || !address}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Analyze Contract
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {report && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Risk Score Card */}
          <div className={`bg-white rounded-xl shadow-lg p-8 ${getRiskBg(report.riskScore)}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {report.contractName}
                </h2>
                <p className="text-gray-600">{report.contractAddress}</p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${getRiskColor(report.riskScore)}`}>
                  {report.riskScore}
                </div>
                <div className="text-gray-600 font-medium">Risk Score</div>
              </div>
            </div>
          </div>

          {/* Vulnerabilities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              Detected Vulnerabilities ({report.vulnerabilities.length})
            </h3>
            {report.vulnerabilities.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>No critical vulnerabilities detected</span>
              </div>
            ) : (
              <div className="space-y-4">
                {report.vulnerabilities.map((vuln, idx) => (
                  <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        vuln.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        vuln.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        vuln.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {vuln.severity}
                      </span>
                      <span className="font-semibold">{vuln.type}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{vuln.description}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Fix:</strong> {vuln.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Analysis */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">🤖 AI Security Assessment</h3>
            <p className="text-gray-700 leading-relaxed">{report.aiAnalysis}</p>
          </div>

          {/* Explorer Link */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <a
              href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/address/${report.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View on ChainGuard Explorer →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
