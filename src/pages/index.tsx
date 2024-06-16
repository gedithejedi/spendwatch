import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export interface Transaction {
  
}

const getTransactions = async ({ address }: { address: string; }) => {
  try {
    const url = `https://api.voyager.online/beta/txns?to=${address}&rejected=false&ps=10&p=1`;
    const response = await axios.get(url, { params: { address }, headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.VOYAGER_API_KEY}`
    } });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function Home() {
  const [address, setAddress] = useState<string>("");
  const [search, setShouldSearch] = useState<boolean>(false);
  
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", address],
    queryFn: () => getTransactions({ address }),
    enabled: !!(address && search),
  });

  console.log(data, isLoading);

  const handleSubmit = () => {
    setShouldSearch(true)
  }
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-slate-900 :ho`}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-center text-3xl">Welcome to SpendWatch</p>
          <p className="text-center text-xl mb-2">Track your wallet interactions</p>
        </div>
        <div className="flex flex-col gap-2">
          <input type="text" className="border bg-gray-700 border-gray-300 rounded-lg p-2" placeholder="0xAc54..." onChange={(e) => setAddress(e.target.value)}/>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={() => handleSubmit()}>
            Get wallet interactions
          </button>
        </div>
      </div>
      <p>Wallet: {address}</p>
    </main>
  );
}
