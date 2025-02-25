export const defaultTranslations = [
  { LanguageId: 1, title: "English Title" },
  { LanguageId: 2, title: "Azerbaijani Title" },
  { LanguageId: 3, title: "Arabic Title" },
];

export const initialLinkData = {
  title: "",
  url: "",
  linkName: "",
  imageFile: null,
  translations: [
    { LanguageId: 1, title: "" },
    { LanguageId: 2, title: "" },
    { LanguageId: 3, title: "" },
  ],
};

export const getInitialLinkData = () => ({
  ...initialLinkData,
  translations: initialLinkData.translations.map((t) => ({ ...t })),
});

export const PAGE_LIMIT = 10;

export const LANGUAGE_IDS = {
  ENGLISH: 1,
  AZERBAIJANI: 2,
  ARABIC: 3,
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const createLinkData = (newLink) => ({
  url: newLink.url,
  linkName: newLink.linkName,
  imageFile: newLink.imageFile,
  translations: newLink.translations,
});

export const formatEditLink = (editLink) => ({
  url: editLink.link,
  linkName: editLink.linkName,
  imageFile: null,
  translations: defaultTranslations.map((defaultItem) => {
    const existingTranslation = editLink.usefulLinksTranslations?.find((t) => t.languageId === defaultItem.LanguageId);

    return existingTranslation
      ? {
          LanguageId: existingTranslation.languageId,
          title: existingTranslation.title,
        }
      : { ...defaultItem, title: "" };
  }),
});
