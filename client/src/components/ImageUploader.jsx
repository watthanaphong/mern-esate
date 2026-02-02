import { useState } from "react";

const ImageUploader = ({ images, setImages }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (files.length + images.length > 6) {
      alert("You can upload up to 6 images only");
      return;
    }

    try {
      setUploading(true);

      const uploads = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mern-estate");
        formData.append("folder", "listings");

        return fetch(
          "https://api.cloudinary.com/v1_1/dznzkmxmw/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
      });

      const results = await Promise.all(uploads);

      const newImages = results.map((data) => ({
        url: data.secure_url,
        public_id: data.public_id,
      }));

      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      alert("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  const removeImage = (public_id) => {
    setImages((prev) =>
      prev.filter((img) => img.public_id !== public_id)
    );
  };

  return (
    <div className="bg-[#241E18] p-5 rounded-xl border border-[#3A2C22]">
      <p className="text-sm text-[#E6D3A3] mb-3">
        Images (max 6) – first image will be cover
      </p>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="text-sm text-[#E6D3A3]"
      />

      <div className="grid grid-cols-2 gap-3 mt-4">
        {images.map((img) => (
          <div key={img.public_id} className="relative group">
            <img
              src={img.url}
              alt="listing"
              className="h-28 w-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(img.public_id)}
              className="absolute inset-0 bg-black/60 text-red-400 opacity-0 group-hover:opacity-100 transition text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {uploading && (
        <p className="text-xs text-amber-400 mt-3">
          Uploading images...
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
