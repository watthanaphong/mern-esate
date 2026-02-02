import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Listing } from "../types/listing";

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/${id}`);
        if (!res.ok) throw new Error("Listing not found");
        const data = await res.json();
        setListing(data);
      } catch (err) {
        setError("Listing not found");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#1E1713] text-[#E6D3A3] flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#1E1713] text-red-400 flex items-center justify-center">
        {error}
      </div>
    );

  if (!listing) return null;

  return (
    <div className="min-h-screen bg-[#1E1713] text-[#F5EEDC] p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* IMAGES */}
        <div className="grid grid-cols-2 gap-4">
          {listing.images.map((img) => (
            <img
              key={img.public_id}
              src={img.url}
              alt={listing.name}
              className="rounded-xl object-cover h-60 w-full"
            />
          ))}
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-[#E6D3A3]">{listing.name}</h1>
          <p>{listing.description}</p>
          <p className="text-sm text-[#C6A15B]">{listing.address}</p>

          <div className="flex gap-6 text-sm">
            <span>{listing.bedrooms} Beds</span>
            <span>{listing.bathrooms} Baths</span>
          </div>

          <p className="text-xl">
            $
            {listing.offer
              ? listing.discountPrice
              : listing.regularPrice}
            <span className="text-sm text-gray-400"> / month</span>
          </p>

          <button
            onClick={() => navigate(`/edit-listing/${listing._id}`)}
            className="mt-6 border border-[#C6A15B] text-[#C6A15B] px-6 py-3 rounded-xl hover:bg-[#2E271F] transition"
          >
            Edit Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
