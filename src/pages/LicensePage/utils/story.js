import { http } from "viem";
import { StoryClient } from "@story-protocol/core-sdk";
function getStoryClient(account) {
    const config = {
        account: account,
        transport: http("https://testnet.storyrpc.io/"),
        chainId: "iliad",
    };
    return StoryClient.newClient(config);
}
export default getStoryClient;
