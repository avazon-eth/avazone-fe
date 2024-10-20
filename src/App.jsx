import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { storyTestnet } from "viem/chains";
import { RouterProvider } from "react-router-dom";
import router from "@/router/router";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const evmNetworks = [
  {
    blockExplorerUrls: [
      "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com/",
    ],
    chainId: 0x3a14269b,
    chainName: "Calypso Hub Testnet",
    iconUrls: [
      "https://portal.skale.space/assets/honorable-steel-rasalhague-5e84e10b.png",
    ],
    name: "sFUEL",
    nativeCurrency: {
      decimals: 18,
      name: "sFUEL",
      symbol: "sFUEL",
      iconUrl:
        "https://portal.skale.space/assets/honorable-steel-rasalhague-5e84e10b.png",
    },
    networkId: 0x3a14269b,

    rpcUrls: ["https://testnet.skalenodes.com/v1/giant-half-dual-testnet"],
    vanityName: "Calypso Hub Testnet",
  },
  {
    blockExplorerUrls: ["https://testnet.storyscan.xyz/"],
    chainId: 1513,
    chainName: "Story Protocol Testnet",
    iconUrls: [
      "https://pbs.twimg.com/profile_images/1820303986349805569/MKfPfLtz_400x400.jpg",
    ],
    name: "illiad",
    nativeCurrency: {
      decimals: 18,
      name: "illiad",
      symbol: "IP",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1820303986349805569/MKfPfLtz_400x400.jpg",
    },
    networkId: 1513,

    rpcUrls: ["https://testnet.storyrpc.io/"],
    vanityName: "illiad",
  },
];

const config = createConfig({
  chains: [storyTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [storyTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <DynamicContextProvider
      theme="dark"
      settings={{
        environmentId: "c757879a-140c-4e72-8720-340b7cb8e0e2",
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
        appName: "Avazon",
        appLogoUrl: "@/assets/logo.png",
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <RouterProvider router={router} />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

export default App;
