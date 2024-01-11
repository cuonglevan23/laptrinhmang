// icons
import { MdHomeFilled as HomeIcon } from "react-icons/md";
import { IoChatboxEllipsesOutline as ChatIcon } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { TbWorldUpload } from "react-icons/tb";
export const sideMenuData = [
  {
    text: "Home",
    icon: <HomeIcon />,
    route: "/",
  },
  {
    text: "Chat",
    icon: <ChatIcon />,
    route: "/chat",
  },
  {
    text: "Calendar",
    icon: <FaCalendarAlt />,
    route: "/schedule",
  },
  {
    text: "Upload",
    icon: <TbWorldUpload />,
    route: "/uploadfile",
  },
];
