import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const CreateListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
  });

  const [images, setImages] = useState([]);

  /* =======================
     LOAD DATA (EDIT MODE)
  ======================= */
  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${id}`, {
          credentials: "include",
        });
        const data = await res.json();

        setFormData({
          name: data.name,
          description: data.description,
          address: data.address,
          type: data.type,
          parking: data.parking,
          furnished: data.furnished,
          offer: data.offer,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          regularPrice: data.regularPrice,
          discountPrice: data.discountPrice || 0,
        });

        setImages(data.images || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListing();
  }, [id]);

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(id ? `/api/listing/${id}` : "/api/listing", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, images }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      navigate(`/listing/${data._id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen bg-[#1E1713] flex justify-center px-4 py-10">
      <main className="w-full max-w-5xl bg-[#2A201A] rounded-2xl p-8 border border-[#3A2C22]">
        <h1 className="text-3xl text-center text-[#E6D3A3] tracking-widest mb-10">
          {isEdit ? "EDIT LISTING" : "CREATE LISTING"}
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Property name"
              className="input"
              required
              minLength={10}
              maxLength={70}
            />

            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Description"
              className="input resize-none"
              required
            />

            <input
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="input"
              required
            />

            {/* TYPE */}
            <div className="flex gap-6 text-[#E6D3A3]">
              {["rent", "sale"].map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === t}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, type: t }))
                    }
                  />
                  {t.toUpperCase()}
                </label>
              ))}
            </div>

            {/* OPTIONS */}
            <div className="flex gap-6 text-[#E6D3A3]">
              {["parking", "furnished", "offer"].map((item) => (
                <label key={item} className="flex gap-2">
                  <input
                    type="checkbox"
                    id={item}
                    checked={formData[item]}
                    onChange={handleChange}
                  />
                  {item}
                </label>
              ))}
            </div>

            {/* NUMBERS */}
            <div className="grid grid-cols-2 gap-4">
              {[
                ["bedrooms", "Beds"],
                ["bathrooms", "Baths"],
                ["regularPrice", "Regular Price ($)"],
              ].map(([id, label]) => (
                <div key={id}>
                  <p className="text-sm text-[#E6D3A3] mb-1">{label}</p>
                  <input
                    id={id}
                    type="number"
                    value={formData[id]}
                    onChange={handleChange}
                    min={1}
                    className="input"
                    required
                  />
                </div>
              ))}

              {formData.offer && (
                <div>
                  <p className="text-sm text-[#E6D3A3] mb-1">
                    Discount Price ($)
                  </p>
                  <input
                    id="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    min={1}
                    className="input"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <ImageUploader images={images} setImages={setImages} />

          <button
            disabled={loading}
            className="md:col-span-2 mt-6 bg-[#C6A15B] py-3 rounded-xl text-[#1E1713] uppercase tracking-wide disabled:opacity-70"
          >
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Listing"
                : "Create Listing"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
