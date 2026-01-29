import { Icon } from "@iconify/react/dist/offline";
import { Link } from "react-router-dom";

const BlogLink = () => {
  return (
    <Link
      to="/blog"
      aria-label="Open blog"
      className="group cursor-pointer focus:outline-none"
    >
      <svg
        width="90"
        height="90"
        viewBox="0 0 250 250"
        color="white"
        className="absolute right-0 top-0 z-50 fill-[#151513] text-white opacity-95 group-hover:opacity-100"
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      </svg>

      <Icon
        icon="la:newspaper"
        className="absolute right-4 top-4 z-50 text-white group-hover:scale-105"
        width={22}
        aria-hidden="true"
      />
    </Link>
  );
};

export default BlogLink;
