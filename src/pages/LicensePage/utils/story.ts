import { http } from "viem";
import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

function getStoryClient(account: Account) {
  const config: StoryConfig = {
    account: account,
    transport: http("https://testnet.storyrpc.io/"),
    chainId: "iliad",
  };

  return StoryClient.newClient(config);
}

export default getStoryClient;
