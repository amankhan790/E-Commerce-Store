import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr className="border-1 bg-[--text-color] mb-5 mt-15" />
      <div className="bg-white-200 w-full h-7xl flex justify-between gap-20 md:gap-10 mt-10 mb-10 flex-wrap">
        <div>
          <h1 className="text-xl font-bold mb-5">Ak Tech</h1>
          <p>Smart Shopping Made Simple.</p>
          <p></p>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-5">Shop</h1>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer w-40 hover:font-bold">All Product</li>
            <li className="cursor-pointer w-40 hover:font-bold">Electronics</li>
            <li className="cursor-pointer w-40 hover:font-bold">Clothing</li>
            <li className="cursor-pointer w-40 hover:font-bold">Accessories</li>
          </ul>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-5">Company</h1>
          <ul className="flex flex-col gap-2 ">
            <li className="cursor-pointer hover:font-bold">About Us</li>
            <li className="cursor-pointer hover:font-bold">Careers</li>
            <li className="cursor-pointer hover:font-bold">Contact</li>
            <li className="cursor-pointer hover:font-bold">Support</li>
          </ul>
        </div>
      </div>

      <hr className="border-1 bg-[--text-color] mb-5" />

      <div className="text-sm text-[--text-color] text-center sm:flex justify-between items-center pb-10">
        &copy; {new Date().getFullYear()} Ak Tech. All rights reserved.
        <ul className="flex gap-5 text-xl justify-center mt-5">
          <li className="cursor-pointer hover:opacity-70 transition-all">
            <FaFacebookSquare />
          </li>
          <li className="cursor-pointer hover:opacity-70 transition-all">
            <GrInstagram />
          </li>
          <li className="cursor-pointer hover:opacity-70 transition-all">
            <FaXTwitter />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
