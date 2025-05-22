// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { LAMPORTS_PER_SOL } from "@solana/web3.js";

// export function ShowBalance() {
//     const { connection } = useConnection();
//     const wallet = useWallet();

//     async function getBalance() { 
//         if (wallet.publicKey) {

//             const balance = await connection.getBalance(wallet.publicKey);
//             document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
//         }
//     }
    
//     getBalance();
//     return <div>
//         <p>SOL Balance:</p> <div id="balance"></div>
//     </div>
// }


// import React, { useState, useEffect } from 'react';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { LAMPORTS_PER_SOL } from '@solana/web3.js';
// import { FaWallet } from 'react-icons/fa';

// const CheckBalance = () => {
//   const { connection } = useConnection();
//   const { publicKey } = useWallet();
//   const [balance, setBalance] = useState(null);

//   const fetchBalance = async () => {
//     try {
//       if (publicKey) {
//         const lamports = await connection.getBalance(publicKey);
//         setBalance(lamports / LAMPORTS_PER_SOL);
//       }
//     } catch (err) {
//       console.error('Failed to fetch balance:', err);
//     }
//   };

//   useEffect(() => {
//     fetchBalance();
//   }, [publicKey, connection]);

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border mt-6">
//       <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//         <FaWallet className="text-indigo-500" />
//         Wallet Balance
//       </h2>
//       {publicKey ? (
//         <div className="text-lg text-gray-700 dark:text-gray-200">
//           {balance !== null ? (
//             <p><span className="font-bold">SOL:</span> {balance.toFixed(4)}</p>
//           ) : (
//             <p>Fetching balance...</p>
//           )}
//         </div>
//       ) : (
//         <p className="text-sm text-red-500">Connect your wallet to view balance</p>
//       )}
//       <button
//         onClick={fetchBalance}
//         className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded transition"
//         disabled={!publicKey}
//       >
//         Refresh Balance
//       </button>
//     </div>
//   );
// };

// export default CheckBalance;


import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FaWallet, FaSyncAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CheckBalance = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBalance = async () => {
        if (!publicKey) return;

        setLoading(true);
        try {
            const bal = await connection.getBalance(publicKey);
            setBalance(bal / 1e9);
        } catch (err) {
            console.error('Error fetching balance:', err);
            setBalance(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicKey]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg mt-10"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-3">
                    <FaWallet size={26} /> Check Wallet Balance
                </h2>
                <button
                    onClick={fetchBalance}
                    disabled={loading || !publicKey}
                    className="text-yellow-400 hover:text-yellow-300 transition text-xl"
                    title="Refresh Balance"
                >
                    <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="text-white text-lg font-medium">
                {publicKey ? (
                    balance !== null ? (
                        <span>
                            💰 Balance: <span className="text-green-400 font-semibold">{balance.toFixed(4)} SOL</span>
                        </span>
                    ) : (
                        <span className="text-gray-400">Fetching balance...</span>
                    )
                ) : (
                    <span className="text-red-500">Connect your wallet to view balance.</span>
                )}
            </div>
        </motion.div>
    );
};

export default CheckBalance;
