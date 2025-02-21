const handleTranslationChange = (newLink, index, field, value) => {
  const updatedTranslations = [...newLink.translations];
  updatedTranslations[index][field] = value;

  return {
    ...newLink,
    translations: updatedTranslations,
  };
};

export default handleTranslationChange;
