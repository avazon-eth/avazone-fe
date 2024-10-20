import { create } from "ipfs-http-client";
import { createPublicClient, http } from "viem";
import { skaleCalypso } from "viem/chains";
import { DynamicContext } from "@dynamic-labs/sdk-react";
import { useContext } from "react";

// IPFS 클라이언트 설정
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

// SKALE Calypso Hub 네트워크 설정
const publicClient = createPublicClient({
  chain: skaleCalypso,
  transport: http(),
});

// NFT 컨트랙트 ABI와 주소 (예시)
const nftABI = [
  /* NFT 컨트랙트 ABI */
];
const nftContractAddress = "0x..."; // NFT 컨트랙트 주소

// IPA 컨트랙트 ABI와 주소 (예시)
const ipaABI = [
  /* IPA 컨트랙트 ABI */
];
const ipaContractAddress = "0x..."; // IPA 컨트랙트 주소

export function useMintNFTAndIssueIPA() {
  const { primaryWallet } = useContext(DynamicContext);

  const mintNFTAndIssueIPA = async (metadata) => {
    if (!primaryWallet) {
      throw new Error("Wallet not connected");
    }

    try {
      // 1. IPFS에 메타데이터 업로드
      const { cid } = await ipfs.add(JSON.stringify(metadata));
      const metadataUrl = `ipfs://${cid}`;

      // 2. SKALE Calypso Hub에 NFT 민팅
      const mintTx = await primaryWallet.sendTransaction({
        to: nftContractAddress,
        data: publicClient.encodeFunctionData({
          abi: nftABI,
          functionName: "mint",
          args: [primaryWallet.address, metadataUrl],
        }),
      });

      const mintReceipt = await publicClient.waitForTransactionReceipt({
        hash: mintTx,
      });
      console.log("NFT minted:", mintReceipt.transactionHash);

      // NFT tokenId 추출 (예시, 실제 로직은 컨트랙트에 따라 다를 수 있음)
      const tokenId = mintReceipt.logs[0].topics[3];

      // 3. Story Illiad에서 IPA 발행
      const ipaTx = await primaryWallet.sendTransaction({
        to: ipaContractAddress,
        data: publicClient.encodeFunctionData({
          abi: ipaABI,
          functionName: "issueIPA",
          args: [tokenId],
        }),
      });

      const ipaReceipt = await publicClient.waitForTransactionReceipt({
        hash: ipaTx,
      });
      console.log("IPA issued:", ipaReceipt.transactionHash);

      return {
        nftHash: mintReceipt.transactionHash,
        ipaHash: ipaReceipt.transactionHash,
      };
    } catch (error) {
      console.error("Error in minting NFT and issuing IPA:", error);
      throw error;
    }
  };

  return mintNFTAndIssueIPA;
}
