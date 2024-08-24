import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import Airdrop from "./Airdrop";
// import TransferSOL from "./TransferSOL";
import { useWallet } from "@solana/wallet-adapter-react";

import '@dialectlabs/blinks/index.css';
import { useState, useMemo, useEffect } from 'react';
import { Action, Blink, type ActionAdapter, useActionsRegistryInterval } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

// needs to be wrapped with <WalletProvider /> and <WalletModalProvider />
const App = () => {
  // SHOULD be the only instance running (since it's launching an interval)
  const { isRegistryLoaded } = useActionsRegistryInterval();
  const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');
    
  // Displaying a simple message
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to your Solana Action App</p>
      {isRegistryLoaded ? <ManyActions adapter={adapter} /> : <p>Loading actions...</p>}
    </div>
  );
}

const ManyActions = ({ adapter }: { adapter: ActionAdapter }) => {
  const apiUrls = useMemo(() => ([
    'http://localhost:3000/api/actions/donate-sol', // Your localhost link
  ]), []);
  const [actions, setActions] = useState<Action[]>([]);
    
  useEffect(() => {
    const fetchActions = async () => {
      const promises = apiUrls.map(url => Action.fetch(url).catch(() => null));
      const actions = await Promise.all(promises);
            
      setActions(actions.filter(Boolean) as Action[]);
    }
        
    fetchActions();
  }, [apiUrls]);
    
    // we need to update the adapter every time, since it's dependent on wallet and walletModal states
  useEffect(() => {
    actions.forEach((action) => action.setAdapter(adapter));
  }, [actions, adapter]);
    
  return actions.map(action => (
    <div key={action.url} className="flex gap-2">
      <Blink action={action} websiteText={new URL(action.url).hostname} />
    </div>
  ));
}
export default App;
