import axios from "axios";

export const uploadToIPFS = async (metadata) => {
  try {
    // Upload file to QuickNode's IPFS gateway
    const response = await axios.post(
      "https://shelter-finish-full.quicknode-ipfs.com/ipfs/api/v0/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const ipfsHash = metadata.Hash;
    const fileUrl = `https://shelter-finish-full.quicknode-ipfs.com/ipfs/${ipfsHash}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to IPFS: ", error);
  }
};
