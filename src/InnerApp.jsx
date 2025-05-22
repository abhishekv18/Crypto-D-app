
// import React, { useEffect, useState } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import SignMessage from './SignMessage';
// import AirdropSol from './Airdrop';
// import CheckBalance from './ShowBalance';
// import SendSol from './SendSol';

// const InnerApp = () => {
//   const { publicKey } = useWallet();
//   const [signed, setSigned] = useState(false);

//   // Restore sign-in from localStorage if wallet is connected
//   useEffect(() => {
//     const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
//     if (publicKey && storedAuth) {
//       setSigned(true);
//     }
//   }, [publicKey]);

//   // Reset sign-in if wallet is disconnected
//   useEffect(() => {
//     if (!publicKey) {
//       setSigned(false);
//       localStorage.setItem('isAuthenticated', 'false');
//     }
//   }, [publicKey]);

//   const handleSetSigned = (value) => {
//     setSigned(value);
//     localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
//       <Navbar />

//       {!signed && <SignMessage setSigned={handleSetSigned} />}

//       {signed && (
//         <div className="grid md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
//           <AirdropSol />
//           <CheckBalance />
//           <SendSol />
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default InnerApp;
// import React, { useEffect, useState } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import SignMessage from './SignMessage';
// import AirdropSol from './Airdrop';
// import CheckBalance from './ShowBalance';
// import SendSol from './SendSol';

// const InnerApp = () => {
//   const { publicKey, connecting } = useWallet();
//   const [signed, setSigned] = useState(false);
//   const [isWalletChecked, setIsWalletChecked] = useState(false); // flag for wallet reconnection status

//   // Wait until wallet autoConnect finishes
//   useEffect(() => {
//     if (!connecting) {
//       setIsWalletChecked(true);
//     }
//   }, [connecting]);

//   // After wallet is checked, decide whether to restore or reset
//   useEffect(() => {
//     if (!isWalletChecked) return;

//     const storedAuth = localStorage.getItem('isAuthenticated') === 'true';

//     if (publicKey && storedAuth) {
//       setSigned(true);
//     } else {
//       setSigned(false);
//       localStorage.setItem('isAuthenticated', 'false');
//     }
//   }, [isWalletChecked, publicKey]);

//   const handleSetSigned = (value) => {
//     setSigned(value);
//     localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
//       <Navbar />

//       {!isWalletChecked ? (
//         <div className="text-center py-10 text-lg">Loading...</div>
//       ) : !signed ? (
//         <SignMessage setSigned={handleSetSigned} />
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
//           <AirdropSol />
//           <CheckBalance />
//           <SendSol />
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default InnerApp;
import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SignMessage from './SignMessage';
import AirdropSol from './Airdrop';
import CheckBalance from './ShowBalance';
import SendSol from './SendSol';
import Window from './Window';

const InnerApp = () => {
       <Window/>
  const { publicKey, connecting } = useWallet();
  const [signed, setSigned] = useState(false);
  const [isWalletReady, setIsWalletReady] = useState(false);

  // Wait for wallet connection status to settle
  useEffect(() => {
    if (!connecting) {
      setIsWalletReady(true);
    }
  }, [connecting]);

  // Once wallet is ready, restore sign-in state if publicKey exists and was signed
  useEffect(() => {
    if (!isWalletReady) return;

    const storedSigned = localStorage.getItem('isAuthenticated') === 'true';

    if (publicKey && storedSigned) {
      setSigned(true);
    } else {
      setSigned(false);
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, [isWalletReady, publicKey]);

  const handleSetSigned = (value) => {
    setSigned(value);
    localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
  };

  return (
   
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
      
      <Navbar />

      {!isWalletReady ? (
        <div className="text-center py-10">Checking Wallet...</div>
      ) : !signed ? (
        <SignMessage setSigned={handleSetSigned} />
      ) : (
        <div className="grid md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
          <AirdropSol />
          <CheckBalance />
          <SendSol />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default InnerApp;
