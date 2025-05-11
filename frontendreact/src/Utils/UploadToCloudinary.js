export const uploadToCloudinary = async (pics,fileType) => {
  try {
    if (pics) {
      console.log(`Starting upload to Cloudinary: ${fileType} file`); 
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "instagram");
      data.append("cloud_name", "dnbw04gbs");

      const res = await fetch(`https://api.cloudinary.com/v1_1/dnbw04gbs/${fileType}/upload`, {
        method: "post",
        body: data,
      });

      const fileData = await res.json();

      if (fileData.url) {
        console.log(`Upload successful. URL: ${fileData.url.toString()}`);
        return fileData.url.toString();
      } else {
        console.error("Cloudinary upload failed: ", fileData);
        return null;
      }
    } else {
      console.error("No file provided for upload");
      return null;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary: ", error);
    return null;
  }
};
