const BLOCKSCOUT_API = 'https://eth-sepolia.blockscout.com/api';

export async function getContractSource(address: string) {
  const response = await fetch(
    `${BLOCKSCOUT_API}?module=contract&action=getsourcecode&address=${address}`
  );
  const data = await response.json();
  
  if (data.status === '1' && data.result?.[0]) {
    return {
      sourceCode: data.result[0].SourceCode,
      contractName: data.result[0].ContractName,
      compilerVersion: data.result[0].CompilerVersion,
      isVerified: data.result[0].SourceCode !== ''
    };
  }
  
  throw new Error('Contract not found or not verified');
}

export async function getContractTransactions(address: string, limit = 10) {
  const response = await fetch(
    `${BLOCKSCOUT_API}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc`
  );
  const data = await response.json();
  return data.result || [];
}
