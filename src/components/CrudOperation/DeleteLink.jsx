import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://135.181.42.5:220/api/home/deleteUsefulLink/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllLinks"] });
    },
  });
};

export default deleteLink;
