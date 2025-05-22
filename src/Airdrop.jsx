
// import React, { useState } from 'react';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
// import { FaCloudDownloadAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const AirdropSOL = () => {
//     const { connection } = useConnection();
//     const { publicKey } = useWallet();
//     const [status, setStatus] = useState(null); // 'success', 'error', or null
//     const [loading, setLoading] = useState(false);

//     const requestAirdrop = async () => {
//         setStatus(null);
//         setLoading(true);

//         try {
//             const airdropSignature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
//             await connection.confirmTransaction(airdropSignature, 'finalized');
//             setStatus('success');
//         } catch (err) {
//             console.error(err);
//             setStatus('error');
//         }

//         setLoading(false);
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg mt-10"
//         >
//             <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-3">
//                 <FaCloudDownloadAlt size={26} /> Airdrop 1 SOL (Devnet)
//             </h2>

//             <button
//                 onClick={requestAirdrop}
//                 disabled={!publicKey || loading}
//                 className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 w-full"
//             >
//                 {loading ? 'Airdropping...' : 'Request Airdrop'}
//             </button>

//             {status === 'success' && (
//                 <div className="mt-4 text-green-400 flex items-center gap-2">
//                     <FaCheckCircle size={20} /> Airdrop successful! 1 SOL received.
//                 </div>
//             )}
//             {status === 'error' && (
//                 <div className="mt-4 text-red-500 flex items-center gap-2">
//                     <FaExclamationTriangle size={20} /> Airdrop failed. Try again.
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// export default AirdropSOL;
import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FaCloudDownloadAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AirdropSOL = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [loading, setLoading] = useState(false);

    const requestAirdrop = async () => {
        setStatus(null);
        setLoading(true);

        try {
            const airdropSignature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
            await connection.confirmTransaction(airdropSignature, 'finalized');
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }

        setLoading(false);

        // Reset status after 3 seconds
        setTimeout(() => {
            setStatus(null);
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg mt-10"
        >
            <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-3">
                <FaCloudDownloadAlt size={26} /> Airdrop 1 SOL (Devnet)
            </h2>

            <button
                onClick={requestAirdrop}
                disabled={!publicKey || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 w-full"
            >
                {loading ? 'Airdropping...' : 'Request Airdrop'}
            </button>

            {status === 'success' && (
                <div className="mt-4 text-green-400 flex items-center gap-2">
                    <FaCheckCircle size={20} /> Airdrop successful! 1 SOL received.
                </div>
            )}
            {status === 'error' && (
                <div className="mt-4 text-red-500 flex items-center gap-2">
                    <FaExclamationTriangle size={20} /> Airdrop failed. Try again.
                </div>
            )}
        </motion.div>
    );
};

export default AirdropSOL;
