import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const MyListings = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/user/me", {
          credentials: "include",
        });
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this listing?")) return;

    try {
      const res = await fetch(`/api/listing/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#1E1713] text-[#E6D3A3] flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1E1713] p-10 text-[#F5EEDC]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-[#E6D3A3] mb-8">My Listings</h1>
<Link to="/create-listing" className="text-center text-sm text-[#C6A15B] hover:underline mt-4">
          <button
                type="button"
                className="
                  w-full
                  flex items-center justify-center gap-3
                  bg-[#241E18]
                  border border-[#C6A15B]
                  text-[#C6A15B]
                  py-3
                  rounded-lg
                  tracking-wide
                  uppercase
                  text-sm
                  hover:bg-[#2E271F]
                  transition
                  font-medium
                "
              >
                Create Listing
              </button>
            </Link>
        {listings.length === 0 && (
          <p className="text-gray-400">No listings yet</p>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-[#2A201A] rounded-xl overflow-hidden border border-[#3A2C22]"
            >
              <img
                src={listing.images?.[0]?.url}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg text-[#E6D3A3] truncate">
                  {listing.name}
                </h2>

                <p className="text-sm text-gray-400 truncate">
                  {listing.address}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/listing/${listing._id}`)
                    }
                    className="flex-1 border border-[#C6A15B] text-[#C6A15B] py-2 rounded-lg hover:bg-[#2E271F]"
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="flex-1 border border-red-500 text-red-400 py-2 rounded-lg hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
