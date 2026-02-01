import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const currentUser = useAppSelector((state) => state.user.currentUser);

  // 🔹 local state (ใช้แสดงผล)
  const [avatar, setAvatar] = useState("");
  const [avatarPublicId, setAvatarPublicId] = useState(
    currentUser?.avatarPublicId || "",
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔹 sync จาก redux → local state (เฉพาะตอน redux เปลี่ยนจริง)
  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.avatar);
      setAvatarPublicId(currentUser.avatarPublicId || ""); // 👈 สำคัญ
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser?._id]);

  // =============================
  // Upload avatar (Cloudinary)
  // =============================
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("ไฟล์ต้องไม่เกิน 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mern-estate");
    formData.append("folder", "avatars");

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dznzkmxmw/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      // 🔹 แค่ preview ก่อน submit
      setAvatar(data.secure_url);
      setAvatarPublicId(data.public_id); // 👈 เพิ่ม
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // =============================
  // Submit profile → Mongo + Redux
  // =============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          avatar,
          avatarPublicId, // 👈 ส่งไป backend
          ...(password && { password }), // ✅ ไม่ส่งถ้าว่าง
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      // 🔥 สำคัญที่สุด
      dispatch(updateUserSuccess(data));

      setPassword("");
      alert("Profile updated successfully 🎉");
    } catch (err: any) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <div className="min-w-5 mt-10 bg-[#1E1713] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#2A201A] rounded-2xl shadow-2xl p-8 border border-[#3A2C22]">
        <h1 className="text-3xl font-light text-center text-[#E6D3A3] tracking-widest mb-8">
          PROFILE
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Avatar */}
          <div className="flex justify-center">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />

            <img
              onClick={() => fileRef.current?.click()}
              src={avatar || currentUser?.avatar}
              alt="Profile"
              className={`w-28 h-28 rounded-full object-cover border-4 border-[#C6A15B]
              cursor-pointer transition
              ${uploading ? "opacity-50" : "hover:scale-105"}`}
            />
          </div>

          {uploading && (
            <p className="text-center text-sm text-[#C6A15B]">Uploading...</p>
          )}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-[#1E1713] border border-[#3A2C22] rounded-lg px-4 py-3 text-[#F5EEDC]"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-[#1E1713] border border-[#3A2C22] rounded-lg px-4 py-3 text-[#F5EEDC]"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="bg-[#1E1713] border border-[#3A2C22] rounded-lg px-4 py-3 text-[#F5EEDC]"
          />

          <button
            type="submit"
            disabled={uploading}
            className="mt-6 bg-[#C6A15B] text-[#1E1713] py-3 rounded-xl uppercase text-sm"
          >
            Update Profile
          </button>
        </form>
        {/* Actions */}{" "}
        <div className="flex justify-between mt-8 text-sm">
          {" "}
          <span className="text-red-500 hover:text-red-400 cursor-pointer transition">
            {" "}
            Delete account{" "}
          </span>{" "}
          <span className="text-[#C6A15B] hover:underline cursor-pointer transition">
            {" "}
            Sign out{" "}
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Profile;
