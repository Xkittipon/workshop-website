import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fca311] text-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-18 lg:gap-40 py-10 flex flex-col md:flex-row md:justify-between md:items-start md:gap-40">
        {/* Left Section: Logo & Description */}
        <div className="flex-2 mx-10">
          <h1 className="font-bold text-3xl mb-4 tracking-wide ">LOGO</h1>
          <p className="text-sm leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            reiciendis ex reprehenderit alias aspernatur ipsum, odio quibusdam
            eaque. Saepe maiores quibusdam est repellat hic odio ipsum ex?
            Assumenda, fugit aliquam!
          </p>

          <div className="flex space-x-4 mt-5">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                alt="Facebook"
                className="w-9 h-9"
              />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition transform hover:scale-110"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124027.png"
                alt="LINE"
                className="w-9 h-9 rounded-full"
              />
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-evenly">
          {/* เมนูลัด */}
          <div>
            <h2 className="font-semibold text-xl mb-4">Menu</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-gray-200 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-gray-200 transition"
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* ติดต่อเรา */}
          <div>
            <h2 className="font-semibold text-xl mb-4">Contact Us</h2>
            <p className="text-sm mb-2">
              📧{" "}
              <a
                href="mailto:Kittiponx@gmail.com"
                className="hover:underline hover:text-gray-200"
              >
                Kittiponx@gmail.com
              </a>
            </p>
            <p className="text-sm mb-2">📱 093-000-0000</p>
            <p className="text-sm">📍 Bangkok Thailand</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#000000] py-3 text-center text-xs">
        <p>
          © {new Date().getFullYear()} Make by{" "}
          <span className="font-semibold">Kittipon</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
