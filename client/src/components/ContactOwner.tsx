import { Link } from "react-router-dom";

const ContactOwner = ({ owner }: any) => {
  return (
    <div className="border rounded-xl p-4 bg-[#1f1a17] text-[#e7d3b1]">
      <h3 className="text-lg font-semibold mb-2">📞 Contact Owner</h3>

      <p className="text-sm mb-3">
        {owner.username} <br />
        {owner.email}
      </p>

      <a
        href={`mailto:${owner.email}`}
        className="block text-center bg-[#b89b5e] hover:bg-[#d4b97a] text-black py-2 rounded-lg transition"
      >
        Send Email
      </a>
    </div>
  );
};

export default ContactOwner;
