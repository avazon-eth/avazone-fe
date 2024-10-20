import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import licenses from "../static/terms.json";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { http } from "viem";
import { StoryClient } from "@story-protocol/core-sdk";
import { getDataByCreationId } from "@/utils/getDataByCreationId";
import { uploadToIPFS } from "@/utils/uploadToIPFS";

const LicensePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const creationId = queryParams.get("creation_id");

  const [selectedLicense, setSelectedLicense] = useState(null);
  const [hoveredLicense, setHoveredLicense] = useState(null);
  const [creatorRoyalty, setCreatorRoyalty] = useState(false);
  const [mintingFee, setMintingFee] = useState(false);
  const [creatorRoyaltyValue, setCreatorRoyaltyValue] = useState("");
  const [mintingFeeValue, setMintingFeeValue] = useState("");

  const { primaryWallet } = useDynamicContext();

  function getStoryClient(account) {
    const config = {
      account: account,
      transport: http("https://testnet.storyrpc.io/"),
      chainId: "iliad",
    };
    return StoryClient.newClient(config);
  }

  const handleLicenseSelect = (license) => {
    console.log(license);
    if (license === "non-commercial") {
      setCreatorRoyalty(false);
      setMintingFee(false);
    } else if (license === "commercial") {
      setCreatorRoyalty(false);
      setMintingFee(true);
    } else {
      setCreatorRoyalty(true);
      setMintingFee(true);
    }

    setSelectedLicense(license);
  };

  const handleMouseEnter = (license) => {
    setHoveredLicense(license);
  };

  const handleMouseLeave = () => {
    setHoveredLicense(null);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/home");
    }
  };

  const handlePublishOrNext = async () => {
    if (!selectedLicense) {
      alert("Please select a license type.");
      return;
    }

    if (creatorRoyalty && !creatorRoyaltyValue.trim()) {
      alert("Please enter a Creator Royalty value.");
      return;
    }

    if (mintingFee && !mintingFeeValue.trim()) {
      alert("Please enter a Minting Fee value.");
      return;
    }

    const action = selectedLicense ? "publish" : "proceed to the next step";
    if (window.confirm(`Are you sure you want to ${action}?`)) {
      // Implement publish or next step logic here
      console.log(selectedLicense ? "Publishing..." : "Moving to next step...");
      console.log("Creator Royalty:", creatorRoyaltyValue);
      console.log("Minting Fee:", mintingFeeValue);

      const client = getStoryClient(primaryWallet);
      // register pil term
      let response;
      if (selectedLicense === "non-commercial") {
        const nonComSocialRemixingParams = {};
        response = await client.license.registerNonComSocialRemixingPIL({
          ...nonComSocialRemixingParams,
          txOptions: { waitForTransaction: true },
        });
      } else if (selectedLicense === "commercial") {
        const commercialUseParams = {
          currency: "0xB132A6B7AE652c974EE1557A3521D53d18F6739f", // see the above note on whitelisted revenue tokens
          defaultMintingFee: `${mintingFeeValue}`, // 10 of the currency (using the above currency, 10 MERC20)
        };
        response = await client.license.registerCommercialUsePIL({
          ...commercialUseParams,
          txOptions: { waitForTransaction: true },
        });
      } else {
        const commercialRemixParams = {
          currency: "0xB132A6B7AE652c974EE1557A3521D53d18F6739f", // see the above note on whitelisted revenue tokens
          defaultMintingFee: `${mintingFeeValue}`, // 10 of the currency (using the above currency, 10 MERC20)
          commercialRevShare: creatorRoyaltyValue, // 10%
        };
        response = await client.license.registerCommercialRemixPIL({
          ...commercialRemixParams,
          txOptions: { waitForTransaction: true },
        });
      }

      // get data an make metadata with creation id
      const data = await getDataByCreationId(creationId);
      console.log(">>>>>", data);

      const metadata = {
        id: data.id,
        user_id: data.user_id,
        image: data.images[0].url,
        character: data.characters[0].content,
        voices: data.voices[0].voice_url,
        name: data.name,
        speed: data.speed,
        gender: data.gender,
        language: data.language,
        country: data.country,
        description: data.description,
        image_style: data.image_style,
        status: data.status,
      };

      const ipMetadata = {
        title: metadata.name,
        description: metadata.description,
        image: metadata.image,
      };

      // upload metadata to ipfs
      const ipfsResponse = await uploadToIPFS(metadata);
      console.log("IPFS upload response:", ipfsResponse);

      const ipfsMetadataResponse = await uploadToIPFS(ipMetadata);
      console.log("IPFS metadata upload response:", ipfsMetadataResponse);

      // mint erc 721
      const mintParams = {
        to: "0x67CB4D80706d2D6E32678F193AE014bc18743fA8", // replace with the recipient address
        metadataURI: ipfsResponse,
        chainName: "iliad",
        chainId: 1513,
      };

      const mintABI = [
        {
          type: "constructor",
          inputs: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            { name: "initialOwner", type: "address", internalType: "address" },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "owner", type: "address", internalType: "address" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getApproved",
          inputs: [
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getChainMetadata",
          inputs: [
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [
            { name: "chainName", type: "string", internalType: "string" },
            { name: "chainId", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isApprovedForAll",
          inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "operator", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "mintAvatar",
          inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "tokenURI", type: "string", internalType: "string" },
            { name: "chainName", type: "string", internalType: "string" },
            { name: "chainId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "ownerOf",
          inputs: [
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "safeTransferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "safeTransferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "tokenId", type: "uint256", internalType: "uint256" },
            { name: "data", type: "bytes", internalType: "bytes" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setApprovalForAll",
          inputs: [
            { name: "operator", type: "address", internalType: "address" },
            { name: "approved", type: "bool", internalType: "bool" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "supportsInterface",
          inputs: [
            { name: "interfaceId", type: "bytes4", internalType: "bytes4" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenChainData",
          inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          outputs: [
            { name: "chainName", type: "string", internalType: "string" },
            { name: "chainId", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenURI",
          inputs: [
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            { name: "newOwner", type: "address", internalType: "address" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            {
              name: "owner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "approved",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "ApprovalForAll",
          inputs: [
            {
              name: "owner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "operator",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "approved",
              type: "bool",
              indexed: false,
              internalType: "bool",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "tokenId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ERC721IncorrectOwner",
          inputs: [
            { name: "sender", type: "address", internalType: "address" },
            { name: "tokenId", type: "uint256", internalType: "uint256" },
            { name: "owner", type: "address", internalType: "address" },
          ],
        },
        {
          type: "error",
          name: "ERC721InsufficientApproval",
          inputs: [
            { name: "operator", type: "address", internalType: "address" },
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
        },
        {
          type: "error",
          name: "ERC721InvalidApprover",
          inputs: [
            { name: "approver", type: "address", internalType: "address" },
          ],
        },
        {
          type: "error",
          name: "ERC721InvalidOperator",
          inputs: [
            { name: "operator", type: "address", internalType: "address" },
          ],
        },
        {
          type: "error",
          name: "ERC721InvalidOwner",
          inputs: [{ name: "owner", type: "address", internalType: "address" }],
        },
        {
          type: "error",
          name: "ERC721InvalidReceiver",
          inputs: [
            { name: "receiver", type: "address", internalType: "address" },
          ],
        },
        {
          type: "error",
          name: "ERC721InvalidSender",
          inputs: [
            { name: "sender", type: "address", internalType: "address" },
          ],
        },
        {
          type: "error",
          name: "ERC721NonexistentToken",
          inputs: [
            { name: "tokenId", type: "uint256", internalType: "uint256" },
          ],
        },
        {
          type: "error",
          name: "OwnableInvalidOwner",
          inputs: [{ name: "owner", type: "address", internalType: "address" }],
        },
        {
          type: "error",
          name: "OwnableUnauthorizedAccount",
          inputs: [
            { name: "account", type: "address", internalType: "address" },
          ],
        },
      ];

      const mintContractAddress = "0x67CB4D80706d2D6E32678F193AE014bc18743fA8"; // replace with your contract address

      const mintTransaction = await client.contract.call({
        address: mintContractAddress,
        abi: mintABI,
        functionName: "mintAvatar",
        args: [
          mintParams.to,
          mintParams.metadataURI,
          mintParams.chainName,
          mintParams.chainId,
        ],
        txOptions: { waitForTransaction: true },
      });

      console.log("Mint transaction response:", mintTransaction);

      // register ip asset
      const ipaAssetResponse = await client.ipAsset.register({
        nftContract: "0x67CB4D80706d2D6E32678F193AE014bc18743fA8", // your NFT contract address
        tokenId: "1", // your NFT token ID
        ipMetadata: {
          ipMetadataURI: ipfsMetadataResponse,
          ipMetadataHash: toHex(metadata, { size: 32 }),
          nftMetadataHash: toHex(ipMetadata, { size: 32 }),
          nftMetadataURI: ipfsResponse,
        },
        txOptions: { waitForTransaction: true },
      });

      // register pil term
      const res = await client.license.attachLicenseTerms({
        licenseTermsId: response.licenseTermsId,
        ipId: ipaAssetResponse.ipId,
        txOptions: { waitForTransaction: true },
      });

      if (res.success) {
        console.log(
          `Attached License Terms to IPA at transaction hash ${response.txHash}.`
        );
      } else {
        console.log(`License Terms already attached to this IPA.`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-6 pt-24">
      <Card className="bg-[#1b1b1b] text-white p-6 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100%-4rem)] overflow-hidden">
        <h2 className="text-xl mb-4">Select License Type</h2>

        <div className="flex gap-6 h-[calc(100%-3rem)] overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-2 text-white">
            {licenses.map((license) => (
              <Card
                key={license.type}
                className={`p-4 mb-2 cursor-pointer border border-shiny-outstroke bg-darkgrey-2 rounded-custom text-white ${
                  selectedLicense === license.type
                    ? "bg-[#595959]"
                    : hoveredLicense === license.type
                    ? "bg-[#2A2A2A]"
                    : "bg-[#2A2A2A]"
                }`}
                onClick={() => handleLicenseSelect(license.type)}
                onMouseEnter={() => handleMouseEnter(license.type)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="font-bold">{license.title}</div>
                <div>{license.description}</div>
                {(selectedLicense === license.type ||
                  hoveredLicense === license.type) && (
                  <div>
                    <div>
                      <strong>Others Can:</strong>
                    </div>
                    <ul>
                      {license.details.can.map((item, index) => (
                        <li key={index}>✅ {item}</li>
                      ))}
                    </ul>
                    {license.details.cannot && (
                      <>
                        <div>
                          <strong>Others Cannot:</strong>
                        </div>
                        <ul>
                          {license.details.cannot.map((item, index) => (
                            <li key={index}>❌ {item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div>
                      <strong>Additional Notes:</strong>
                    </div>
                    <ul>
                      {license.details.notes.map((item, index) => (
                        <li key={index}>ℹ️ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="overflow-y-auto flex-grow pr-2">
              <div className="mb-4">
                <div className="font-bold mb-2">Payout & Royalties</div>
                <div className="space-y-2">
                  <div className={`${!creatorRoyalty ? "opacity-50" : ""}`}>
                    <label className="block">
                      <h2 className="text-white">Creator Royalty</h2>
                      <div className="text-gray-300">
                        The percentage you get for every remix of the Avatar
                      </div>
                    </label>
                    <Input
                      type="text"
                      className={`bg-[rgba(55,55,55,0.55)] p-2 rounded-[100px] w-full ${
                        !creatorRoyalty ? "text-gray-400" : "text-white"
                      }`}
                      placeholder="%"
                      disabled={!creatorRoyalty}
                      value={creatorRoyaltyValue}
                      onChange={(e) => setCreatorRoyaltyValue(e.target.value)}
                    />
                  </div>
                  <div className={`${!mintingFee ? "opacity-50" : ""}`}>
                    <label className="block">
                      <h2 className="text-white">Minting Fee</h2>
                      <div className="text-gray-300">
                        The cost a user must pay to mint a license for this IP
                      </div>
                    </label>
                    <Input
                      type="text"
                      className={`bg-[rgba(55,55,55,0.55)] p-2 rounded-[100px] w-full ${
                        !mintingFee ? "text-gray-400" : "text-white"
                      }`}
                      placeholder="$IP"
                      disabled={!mintingFee}
                      value={mintingFeeValue}
                      onChange={(e) => setMintingFeeValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className={`px-4 py-2 rounded ${
                  selectedLicense ? "bg-blue-500" : "bg-gray-500"
                }`}
                onClick={handlePublishOrNext}
              >
                {selectedLicense ? "Publish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LicensePage;
