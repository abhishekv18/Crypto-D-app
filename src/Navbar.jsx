
// import React, { useState } from "react";
// import { FaHome,  FaRocket } from "react-icons/fa";
// import { FaCodeBranch, FaCoins, FaBalanceScale, FaPaperPlane } from 'react-icons/fa';
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// const Navbar = () => {
//      const [open, setOpen] = useState(false);
//   return (
//     <nav className="w-full flex items-center justify-between px-6 py-4 bg-black bg-opacity-60 backdrop-blur-md border-b border-gray-800 shadow-md sticky top-0 z-50">
//       <div className="flex items-center gap-3 text-purple-500 font-bold text-xl">
//         <FaRocket size={28} />
//         <span>Solana dApp</span>
//       </div>

    
//       <div className="flex items-center justify-center gap-3">
//             <div
//       className="relative"
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
//       <button className="hover:text-purple-500 flex items-center gap-1 focus:outline-none">
//         <FaCodeBranch size={22} />
//         Features
//       </button>

//       {open && (
//         <div className="absolute top-full mt-4 w-48 bg-gray-900 border border-purple-700 rounded-lg shadow-xl z-50">
//           <ul className="flex flex-col text-sm">
//             <li className="hover:bg-purple-800 px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors">
//               <FaCoins size={16} /> Airdrop SOL
//             </li>
//             <li className="hover:bg-purple-800 px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors">
//               <FaBalanceScale size={16} /> Check Balance
//             </li>
//             <li className="hover:bg-purple-800 px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors">
//               <FaPaperPlane size={16} /> Send SOL
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//         <WalletMultiButton className="!bg-purple-600 !hover:bg-purple-700 !text-white !font-semibold" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { FaRocket, FaBars, FaTimes, FaCoins, FaBalanceScale, FaPaperPlane, FaCodeBranch } from "react-icons/fa";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 bg-black bg-opacity-70 backdrop-blur-md border-b border-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 text-purple-500 font-bold text-xl">
          <FaRocket size={28} />
          <span>Solana dApp</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button className="hover:text-purple-500 flex items-center gap-1 focus:outline-none transition-all duration-200">
              <FaCodeBranch size={20} />
              Features
            </button>

            {featuresOpen && (
              <div className="absolute top-full mt-3 w-48 bg-gray-900 border border-purple-700 rounded-lg shadow-xl z-50">
                <ul className="flex flex-col text-sm">
                  <li className="hover:bg-purple-800 px-4 py-2 flex items-center gap-2 cursor-pointer transition">
                    <FaCoins size={16} /> Airdrop SOL
                  </li>
                  <li className="hover:bg-purple-800 px-4 py-2 flex items-center gap-2 cursor-pointer transition">
                    <FaBalanceScale size={16} /> Check Balance
                  </li>
                  <li className="hover:bg-purple-800 px-4 py-2 flex items-center gap-2 cursor-pointer transition">
                    <FaPaperPlane size={16} /> Send SOL
                  </li>
                </ul>
              </div>
            )}
          </div>

          <WalletMultiButton className="!bg-purple-600 !hover:bg-purple-700 !text-white !font-semibold !rounded-lg" />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-400 focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-2 space-y-4">
          <div className="bg-gray-900 border border-purple-700 rounded-lg p-4">
            <p className="text-purple-400 mb-2 font-semibold flex items-center gap-2">
              <FaCodeBranch /> Features
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="hover:bg-purple-800 px-3 py-2 rounded cursor-pointer flex items-center gap-2 transition">
                <FaCoins size={16} /> Airdrop SOL
              </li>
              <li className="hover:bg-purple-800 px-3 py-2 rounded cursor-pointer flex items-center gap-2 transition">
                <FaBalanceScale size={16} /> Check Balance
              </li>
              <li className="hover:bg-purple-800 px-3 py-2 rounded cursor-pointer flex items-center gap-2 transition">
                <FaPaperPlane size={16} /> Send SOL
              </li>
            </ul>
          </div>

          <WalletMultiButton className="!bg-purple-600 !hover:bg-purple-700 !text-white !font-semibold !rounded-lg w-full" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
