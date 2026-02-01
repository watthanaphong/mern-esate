import { useAppSelector } from "../redux/hooks";

const Profile = () => {
  const currentUser = useAppSelector(
    (state) => state.user.currentUser
  );

  return (
    <div className="min-w-5 mt-10 bg-[#1E1713] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#2A201A] rounded-2xl shadow-2xl p-8 border border-[#3A2C22]">
        
        <h1 className="text-3xl font-light text-center text-[#E6D3A3] tracking-widest mb-8">
          PROFILE
        </h1>

        <form className="flex flex-col gap-5">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={currentUser?.avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#C6A15B] cursor-pointer hover:scale-105 transition"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            id="username"
            defaultValue={currentUser?.username}
            placeholder="Username"
            className="bg-[#1E1713] border border-[#3A2C22] rounded-lg px-4 py-3 text-[#F5EEDC] placeholder:text-[#9C8B6D] focus:outline-none focus:border-[#C6A15B]"
          />

          {/* Email */}
          <input
            type="email"
            id="email"
            defaultValue={currentUser?.email}
            placeholder="Email"
            className="bg-[#1E1713] border border-[#3A2C22] rounded-lg px-4 py-3 text-[#F5EEDC] placeholder:text-[#9C8B6D] focus:outline-none focus:border-[#C6A15B]"
          />

          {/* Password */}
          <input
            type="password"
            id="password"
            placeholder="New Password"
            className="bg-[#1E1713] border border-[#3A2C22] rounded-lg px-4 py-3 text-[#F5EEDC] placeholder:text-[#9C8B6D] focus:outline-none focus:border-[#C6A15B]"
          />

          {/* Button */}
          <button
            type="submit"
            className="mt-6 bg-[#C6A15B] text-[#1E1713] py-3 rounded-xl tracking-widest uppercase text-sm font-medium hover:opacity-90 transition"
          >
            Update Profile
          </button>
        </form>

        {/* Actions */}
        <div className="flex justify-between mt-8 text-sm">
          <span className="text-red-500 hover:text-red-400 cursor-pointer transition">
            Delete account
          </span>
          <span className="text-[#C6A15B] hover:underline cursor-pointer transition">
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
