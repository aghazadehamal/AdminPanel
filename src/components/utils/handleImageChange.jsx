const handleImageChange = (e, setNewLink, setPreviewImage) => {
  const file = e.target.files[0];
  if (file) {
    setNewLink((prevLink) => ({
      ...prevLink,
      imageFile: file,
    }));

    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
  }
};

export default handleImageChange;
