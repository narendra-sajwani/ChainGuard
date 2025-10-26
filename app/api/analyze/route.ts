import { NextRequest, NextResponse } from 'next/server';
import { SecurityAnalyzer } from '@/lib/security-analyzer';
import { getContractSource } from '@/lib/blockscout-client';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { contractAddress } = await request.json();

    // Get contract source from Blockscout
    const contract = await getContractSource(contractAddress);

    if (!contract.isVerified) {
      return NextResponse.json({
        error: 'Contract not verified',
        message: 'Please verify contract on Blockscout first'
      }, { status: 400 });
    }

    // Analyze with pattern matching
    const analyzer = new SecurityAnalyzer();
    const vulnerabilities = analyzer.analyzeContract(contract.sourceCode);
    const riskScore = analyzer.calculateRiskScore(vulnerabilities);

    // Get AI analysis
    let aiAnalysis = '';
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: 'You are a smart contract security expert. Analyze contracts and explain vulnerabilities in simple terms.'
        }, {
          role: 'user',
          content: `Analyze this smart contract for security issues:\n\nContract: ${contract.contractName}\n\nVulnerabilities found:\n${vulnerabilities.map(v => `- ${v.type}: ${v.description}`).join('\n')}\n\nProvide a brief security assessment in 2-3 sentences.`
        }],
        max_tokens: 200
      });

      aiAnalysis = completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('AI analysis failed:', error);
      aiAnalysis = 'AI analysis temporarily unavailable';
    }

    return NextResponse.json({
      contractAddress,
      contractName: contract.contractName,
      riskScore,
      vulnerabilities,
      aiAnalysis,
      isVerified: contract.isVerified
    });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Analysis failed',
      message: error.message
    }, { status: 500 });
  }
}
