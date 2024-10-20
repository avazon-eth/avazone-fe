import { create } from "ipfs-http-client";

const ipfs = create(
  "https://shelter-finish-full.quicknode-ipfs.com/ipfs/api/v0"
);

export const uploadToIPFS = async (metadata) => {
  try {
    const result = await ipfs.add(JSON.stringify(metadata));
    return `https://shelter-finish-full.quicknode-ipfs.com/ipfs/${result.path}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};
