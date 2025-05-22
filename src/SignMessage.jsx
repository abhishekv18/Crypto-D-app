
// import React, { useEffect, useState } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { ed25519 } from '@noble/curves/ed25519';
// import bs58 from 'bs58';
// import { FaSignature } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const SignMessage = ({ setSigned }) => {
//     const { publicKey, signMessage } = useWallet();
//  useEffect(() => {
//         const stored = localStorage.getItem("isAuthenticated");
//         if (stored === "true") {
//             setSigned(true);
//         }
//     }, [setSigned]);
//     async function requestSign() {
//         const message = document.getElementById("message").value;
//         const encodedMessage = new TextEncoder().encode(message);

//         try {
//             const signature = await signMessage(encodedMessage);
//             const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBytes());

//             if (!isValid) throw new Error('Message signature invalid!');

//             alert('✅ Signature verified!');
//             setSigned(true); // 🔥 Unlock next features
//              localStorage.setItem("isAuthenticated", "true");
//         } catch (err) {
//             alert(`❌ Error: ${err.message}`);
//         }
//     }

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="p-6 border rounded-xl shadow-lg bg-gray-900 border-gray-700 mt-14 max-w-2xl mx-auto"
//         >
//             <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-500">
//                 <FaSignature size={24} /> Sign Message for Authentication
//             </h2>
//             <div className="flex gap-2">
//                 <input
//                     id="message"
//                     type="text"
//                     placeholder="Enter message to sign"
//                     className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded"
//                 />
//                 <button
//                     onClick={requestSign}
//                     className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
//                 >
//                     Sign
//                 </button>
//             </div>
//         </motion.div>
//     );
// };

// export default SignMessage;
import React, { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ed25519 } from '@noble/curves/ed25519';
import { FaSignature } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SignMessage = ({ setSigned }) => {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem("isAuthenticated");
        if (stored === "true") {
            setSigned(true);
        }
    }, [setSigned]);

    const requestSign = async () => {
        const encodedMessage = new TextEncoder().encode(message);

        try {
            const signature = await signMessage(encodedMessage);
            const isValid = ed25519.verify(signature, encodedMessage, publicKey.toBytes());

            if (!isValid) throw new Error('Message signature invalid!');

            alert('✅ Signature verified!');
            setSigned(true);
            localStorage.setItem("isAuthenticated", "true");

            // Reset input after 2 seconds
            setTimeout(() => {
                setMessage('');
                inputRef.current?.blur(); // optional: remove focus
            }, 2000);
        } catch (err) {
            alert(`❌ Error: ${err.message}`);
             setTimeout(() => {
                setMessage('');
                inputRef.current?.blur(); // optional: remove focus
            }, 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 border rounded-xl shadow-lg bg-gray-900 border-gray-700 mt-14 max-w-2xl mx-auto"
        >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-500">
                <FaSignature size={24} /> Sign Message for Authentication
            </h2>
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter message to sign"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 text-white rounded"
                />
                <button
                    onClick={requestSign}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                    Sign
                </button>
            </div>
        </motion.div>
    );
};

export default SignMessage;
