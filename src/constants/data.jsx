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

export const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
