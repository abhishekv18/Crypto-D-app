
// import React, { useState } from 'react';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
// import { FaPaperPlane, FaCoins } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const SendSol = () => {
//     const { connection } = useConnection();
//     const { publicKey, sendTransaction } = useWallet();
//     const [toAddress, setToAddress] = useState('');
//     const [amount, setAmount] = useState('');
//     const [status, setStatus] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleSend = async () => {
//         if (!publicKey) return;
//         if (!toAddress || !amount) {
//             setStatus({ type: 'error', message: 'Please provide address and amount.' });
//             return;
//         }

//         try {
//             setLoading(true);
//             setStatus(null);

//             const tx = new Transaction().add(
//                 SystemProgram.transfer({
//                     fromPubkey: publicKey,
//                     toPubkey: new PublicKey(toAddress),
//                     lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//                 })
//             );

//             const signature = await sendTransaction(tx, connection);
//             await connection.confirmTransaction(signature, 'confirmed');

//             setStatus({ type: 'success', message: '✅ SOL sent successfully!' });
//         } catch (err) {
//             console.error(err);
//             setStatus({ type: 'error', message: '❌ Failed to send SOL. Check address/amount.' });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg mt-10"
//         >
//             <h2 className="text-2xl font-bold text-pink-500 mb-4 flex items-center gap-3">
//                 <FaPaperPlane size={26} /> Send SOL
//             </h2>

//             <div className="space-y-4">
//                 <input
//                     type="text"
//                     placeholder="Recipient wallet address"
//                     value={toAddress}
//                     onChange={(e) => setToAddress(e.target.value)}
//                     className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Amount (SOL)"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400"
//                 />
//                 <button
//                     onClick={handleSend}
//                     disabled={loading}
//                     className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md w-full flex items-center justify-center gap-2 text-lg font-semibold"
//                 >
//                     <FaCoins size={20} />
//                     {loading ? 'Sending...' : 'Send SOL'}
//                 </button>

//                 {status && (
//                     <div className={`mt-4 text-center font-medium ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
//                         {status.message}
//                     </div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// export default SendSol;
import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { FaPaperPlane, FaCoins } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SendSol = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetStatusAndInputs = (success = false) => {
        setTimeout(() => {
            setStatus(null);
            if (success) {
                setToAddress('');
                setAmount('');
            }
        }, 3000);
    };

    const handleSend = async () => {
        if (!publicKey) return;

        if (!toAddress.trim() || !amount.trim()) {
            setStatus({ type: 'error', message: '⚠️ Please provide both address and amount.' });
            resetStatusAndInputs();
            return;
        }

        try {
            setLoading(true);
            setStatus(null);

            const tx = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(toAddress),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(tx, connection);
            await connection.confirmTransaction(signature, 'confirmed');

            setStatus({ type: 'success', message: '✅ SOL sent successfully!' });
            resetStatusAndInputs(true);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: '❌ Failed to send SOL. Check address/amount.' });
            resetStatusAndInputs();
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg mt-10"
        >
            <h2 className="text-2xl font-bold text-pink-500 mb-4 flex items-center gap-3">
                <FaPaperPlane size={26} /> Send SOL
            </h2>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Recipient wallet address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400"
                />
                <input
                    type="number"
                    placeholder="Amount (SOL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400"
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md w-full flex items-center justify-center gap-2 text-lg font-semibold"
                >
                    <FaCoins size={20} />
                    {loading ? 'Sending...' : 'Send SOL'}
                </button>

                {status && (
                    <div className={`mt-4 text-center font-medium ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {status.message}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SendSol;
