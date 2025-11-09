export async function uploadInvoicePdfToCloudinary(pdfBlob: Blob, fileName: string) {
  const formData = new FormData();
  const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
  formData.append("file", pdfFile);

  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME_LMS_LIBRARY as string,
  );

  // ✅ Optional but useful — sets the Cloudinary filename explicitly
  formData.append("public_id", fileName.replace(/\.[^/.]+$/, "")); // remove .pdf if included
  formData.append("resource_type", "raw"); // ensure Cloudinary treats it as a file, not an image
  formData.append("folder", "lms-u-project-library");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) throw new Error("Failed to upload PDF to Cloudinary");
  const data = await response.json();

  return {
    url: data.secure_url as string,
    public_id: data.public_id as string,
    bytes: data.bytes,
    created_at: data.created_at,
  };
}
