import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkData) => {
      const formData = new FormData();
      formData.append("Link", linkData.url);
      formData.append("LinkName", linkData.linkName);
      formData.append("ImageFile", linkData.imageFile);

      linkData.translations.forEach((translation, index) => {
        formData.append(
          `UsefulLinkTranslations[${index}][LanguageId]`,
          translation.LanguageId
        );
        formData.append(
          `UsefulLinkTranslations[${index}][title]`,
          translation.title
        );
      });

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://135.181.42.5:220/api/home/createUsefulLink",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.datas;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["getAllLinks"], (oldData) => {
        if (!oldData) return [newData];
        if (!Array.isArray(oldData)) return [newData];

        return [newData, ...oldData];
      });
    },
  });
};

export default createLink;
