import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllLinks = (page, limit) => {
  return useQuery({
    queryKey: ["getAllLinks", page, limit],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://135.181.42.5:220/api/home/getAllUsefulLinks?page=${page}&limit=${limit}`, {
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
