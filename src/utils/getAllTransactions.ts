import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Transaction {
  
}

export const getTransactions = async ({ address, chainId }: { address: string; chainId: number }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/taxes`;
    const response = await axios.get(url, { params: { address, chainId } });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useGetTransactions = ({
  address,
  chainId,
  config = {}
}: {
  address: string;
  chainId: number;
  config?: Omit<UseQueryOptions<Transaction, Error>, "queryKey">;
}) => {
  return useQuery({
    queryKey: ["taxes", chainId, address],
    queryFn: () => getTransactions({ address, chainId }),
    enabled: !!(address && chainId),
    ...config
  });
};

export default useGetTransactions;
