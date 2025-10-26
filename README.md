# ChainGuard - AI-Powered Smart Contract Security Monitor

![ChainGuard Logo](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=ChainGuard+-+Smart+Contract+Security)

> Real-time security monitoring for smart contracts using Blockscout infrastructure and AI analysis

**Built for ETHOnline 2025**

---

## 🎯 Overview

ChainGuard is an AI-powered security dashboard that combines Blockscout's Autoscout explorer, SDK integration, and MCP-pattern AI analysis to provide real-time smart contract vulnerability detection and monitoring.

**The Problem**: Smart contract vulnerabilities cost the industry $3+ billion annually. Developers lack tools for continuous, automated security monitoring with human-readable explanations.

**The Solution**: ChainGuard analyzes verified contracts for common vulnerabilities, monitors them in real-time, sends instant alerts, and provides AI-powered security assessments in plain English.

---

## ✨ Key Features

### 1. **Pattern-Based Vulnerability Detection**

Analyzes smart contract source code for:

- ✅ Reentrancy vulnerabilities
- ✅ Unchecked external calls
- ✅ Dangerous delegatecall usage
- ✅ Selfdestruct functions
- ✅ tx.origin authentication issues

### 2. **Real-Time Risk Scoring**

- Dynamic 0-100 risk score calculation
- Severity-weighted vulnerability assessment
- Color-coded risk indicators (green/yellow/red)
- Historical risk tracking

### 3. **AI-Powered Security Analysis**

- Plain English vulnerability explanations
- Contextual security recommendations
- Automated risk assessment summaries
- Developer-friendly security insights

### 4. **Live Transaction Monitoring**

- Blockscout SDK real-time alerts
- Instant notification toasts
- Transaction history tracking
- Suspicious activity flagging

### 5. **Direct Explorer Integration**

- One-click deep-links to Autoscout explorer
- Contract verification status checking
- Transaction detail inspection
- Multi-chain explorer support

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ChainGuard Dashboard (Next.js)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Contract    │  │  Real-Time   │  │   AI Risk    │     │
│  │  Analysis    │  │   Alerts     │  │  Assessment  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              Blockscout Integration Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Autoscout   │  │ Blockscout   │  │     MCP      │     │
│  │   Explorer   │  │     SDK      │  │  AI Pattern  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                  Blockchain Layer (EVM)                      │
│         Ethereum Sepolia / Base / Polygon / etc.             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend**

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query
- Lucide Icons

**Blockchain Integration**

- Blockscout Autoscout (Explorer deployment)
- Blockscout SDK (Real-time notifications)
- Wagmi v2 (Wallet connections)
- Viem (Ethereum interactions)

**AI & Analysis**

- OpenAI GPT-4 (Security analysis)
- MCP Pattern (Blockchain data interpretation)
- Custom vulnerability pattern matching

**Infrastructure**

- Vercel (Frontend hosting)
- Blockscout Autoscout (Explorer hosting)
- REST APIs (Contract data fetching)

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key (for AI analysis)
- Deployed Autoscout explorer instance

### Quick Start

```bash
# Clone repository
git clone https://github.com/narendra-sajwani/ChainGuard.git
cd ChainGuard

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

Create `.env.local` in project root:

```bash
# Blockscout Explorer (from Autoscout deployment)
NEXT_PUBLIC_EXPLORER_URL=https://your-explorer.blockscout.com

# Blockchain Network
NEXT_PUBLIC_CHAIN_ID=11155111  # Ethereum Sepolia

# AI Analysis (get from platform.openai.com)
OPENAI_API_KEY=sk-your-key-here
```

---

## 🎮 Usage

### 1. Analyze a Contract

1. Navigate to ChainGuard dashboard
2. Paste verified contract address (e.g., `0x123...`)
3. Click "Analyze Contract"
4. View risk score and detected vulnerabilities
5. Read AI security assessment

### 2. Monitor Contracts

1. Add contracts to watchlist
2. Receive real-time SDK notifications
3. View transaction history
4. Click alerts for detailed analysis

### 3. Deep Dive in Explorer

1. Click "View on Explorer" links
2. Access full contract source code
3. Review transaction details
4. Verify contract implementation

---

## 🏗️ Project Structure

```
chainguard/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # Contract analysis API
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main dashboard
│   └── providers.tsx           # SDK & React Query providers
├── components/
│   └── (UI components)         # Reusable components
├── lib/
│   ├── security-analyzer.ts    # Vulnerability detection
│   └── blockscout-client.ts    # API integration
├── types/
│   └── security.ts             # TypeScript definitions
├── public/                     # Static assets
├── .env.local                  # Environment config
└── README.md                   # This file
```

---

## 🧪 Testing

### Test with Known Contracts

**Vulnerable Contract Example**:

```
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Secure Contract Example**:

```
0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
```

### Manual Testing

1. Deploy Autoscout explorer on target testnet
2. Deploy test contracts or use existing verified contracts
3. Run analysis through ChainGuard
4. Verify alerts and notifications work
5. Confirm explorer deep-links function

---

## 📋 Development Roadmap

### Current MVP (ETHOnline 2025)

- ✅ Core vulnerability pattern detection
- ✅ Real-time risk scoring
- ✅ Blockscout SDK integration
- ✅ AI-powered analysis
- ✅ Single chain support (Sepolia)

### Future Enhancements

- [ ] Multi-chain monitoring dashboard
- [ ] Advanced ML vulnerability detection
- [ ] Automated security reports
- [ ] WebSocket real-time updates
- [ ] Contract security badges
- [ ] Developer API access
- [ ] Community vulnerability database

---

## 🤝 Contributing

ChainGuard is a hackathon project built for ETHOnline 2025. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- **Blockscout** - Explorer infrastructure and SDK
- **ETHGlobal** - ETHOnline 2025 hackathon
- **OpenAI** - GPT-4 AI analysis
- **Ethereum Foundation** - Blockchain ecosystem

---

**Built with ❤️ for ETHOnline 2025 using Blockscout**

_Making smart contracts safer, one analysis at a time._
