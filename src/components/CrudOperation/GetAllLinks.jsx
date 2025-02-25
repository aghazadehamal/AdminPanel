import { BASE_URL } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllLinks = (page, limit) => {
  return useQuery({
    queryKey: ["getAllLinks", page, limit],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/home/getAllUsefulLinks?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    keepPreviousData: true,
  });
};

export default getAllLinks;
