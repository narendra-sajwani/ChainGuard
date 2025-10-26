import { Vulnerability } from '@/types/security';

export class SecurityAnalyzer {
  analyzeContract(sourceCode: string, bytecode?: string): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];

    // Check 1: Reentrancy
    if (this.hasReentrancyRisk(sourceCode)) {
      vulnerabilities.push({
        type: 'REENTRANCY',
        severity: 'HIGH',
        description: 'Potential reentrancy vulnerability detected in external calls',
        recommendation: 'Use ReentrancyGuard or checks-effects-interactions pattern'
      });
    }

    // Check 2: Unchecked external calls
    if (this.hasUncheckedCalls(sourceCode)) {
      vulnerabilities.push({
        type: 'UNCHECKED_CALL',
        severity: 'MEDIUM',
        description: 'External call without success verification',
        recommendation: 'Always check return value of external calls'
      });
    }

    // Check 3: Selfdestruct
    if (sourceCode.includes('selfdestruct')) {
      vulnerabilities.push({
        type: 'SELFDESTRUCT',
        severity: 'CRITICAL',
        description: 'Contract contains selfdestruct function',
        recommendation: 'Remove selfdestruct or implement strict access controls'
      });
    }

    // Check 4: Delegatecall
    if (sourceCode.includes('delegatecall')) {
      vulnerabilities.push({
        type: 'DELEGATECALL',
        severity: 'HIGH',
        description: 'Delegatecall to untrusted address can be dangerous',
        recommendation: 'Ensure delegatecall target is verified and immutable'
      });
    }

    // Check 5: tx.origin authentication
    if (sourceCode.includes('tx.origin')) {
      vulnerabilities.push({
        type: 'TX_ORIGIN',
        severity: 'MEDIUM',
        description: 'Using tx.origin for authentication is vulnerable to phishing',
        recommendation: 'Use msg.sender instead of tx.origin'
      });
    }

    return vulnerabilities;
  }

  private hasReentrancyRisk(code: string): boolean {
    const hasExternalCall = /\.call\{value:/.test(code) || /\.transfer\(/.test(code);
    const hasNoGuard = !code.includes('nonReentrant') && !code.includes('ReentrancyGuard');
    return hasExternalCall && hasNoGuard;
  }

  private hasUncheckedCalls(code: string): boolean {
    if (!code.includes('.call(')) return false;
    const callPattern = /\.call\([^)]*\)/g;
    const matches = code.match(callPattern);
    if (!matches) return false;
    
    return matches.some(call => {
      const afterCall = code.split(call)[1]?.slice(0, 100);
      return !afterCall?.includes('require(') && !afterCall?.includes('assert(');
    });
  }

  calculateRiskScore(vulnerabilities: Vulnerability[]): number {
    let score = 0;
    vulnerabilities.forEach(v => {
      switch (v.severity) {
        case 'CRITICAL': score += 40; break;
        case 'HIGH': score += 25; break;
        case 'MEDIUM': score += 15; break;
        case 'LOW': score += 5; break;
      }
    });
    return Math.min(100, score);
  }
}
