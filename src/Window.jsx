import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const Window = () => {


  useEffect(() => {
    
      window.scrollTo({ top: 0, behavior: "smooth" });
    
  }, []);
};

export default Window;
