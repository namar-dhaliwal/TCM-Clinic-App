import WechatIcon from "../assets/icons/wechat.png";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center text-lg">
      <div className="flex justify-around gap-10">
        <p>64 Queen St. Warkworth</p>
        <p>Monday to Saturday 9:00 - 5:30 | Sunday 8:15 - 1:00</p>
      </div>

      <div className="flex gap-10 pr-10 mt-5">
        <a
          href="PLACEHOLDERLINK"
          className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full hover:outline hover:outline-2 hover:outline-black"
        >
          <img src={WechatIcon} alt="WeChat" className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full hover:outline hover:outline-2 hover:outline-black color"
        ></a>
      </div>

      <p className="flex justify-center mt-5">Made by ATC</p>
    </div>
  );
};

export default Footer;
