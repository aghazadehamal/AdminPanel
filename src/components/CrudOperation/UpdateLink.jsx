import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const formData = new FormData();
      formData.append("Id", id);
      formData.append("Link", updatedData.url);
      formData.append("LinkName", updatedData.linkName);

      if (updatedData.imageFile && updatedData.imageFile instanceof File) {
        formData.append("ImageFile", updatedData.imageFile);
      }

      updatedData.translations.forEach((translation, index) => {
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

      const response = await axios.put(
        "http://135.181.42.5:220/api/home/updateUsefulLink",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllLinks"] });
    },
  });
};

export default updateLink;
