import WechatIcon from "../assets/icons/wechat.png";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-lg">

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
    </footer>
  );
};

export default Footer;
