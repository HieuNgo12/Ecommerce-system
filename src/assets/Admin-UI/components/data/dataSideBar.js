import dashBoardIcon from "../svg/widget-5-svgrepo-com.svg";
import productIcon from "../svg/archive-svgrepo-com.svg";
import orderIcon from "../svg/cart-large-4-svgrepo-com.svg";
import customerIcon from "../svg/user-circle-svgrepo-com.svg";
import promotionIcon from "../svg/star-svgrepo-com.svg";
import reviewtIcon from "../svg/chat-square-like-svgrepo-com.svg";
import analyticsIcon from "../svg/graph-up-svgrepo-com.svg";
import quotes from "../svg/document-add-svgrepo-com.svg";
import auditIcon from "../svg/layers-minimalistic-svgrepo-com.svg";
import backUpIcon from "../svg/database-svgrepo-com.svg";
import settingIcon from "../svg/settings-svgrepo-com.svg";
import helpIcon from "../svg/question-square-svgrepo-com.svg";

const dataSideBar = [
  { id: "1", img: dashBoardIcon, name: "Dashboard", requiresSuper: false },
  { id: "2", img: analyticsIcon, name: "Analytics", requiresSuper: false },
  { id: "3", img: productIcon, name: "Products", requiresSuper: false },
  { id: "4", img: orderIcon, name: "Orders", requiresSuper: false },
  { id: "5", img: customerIcon, name: "Customers", requiresSuper: false },
  { id: "6", img: customerIcon, name: "Admin", requiresSuper: true },
  { id: "7", img: reviewtIcon, name: "Rating", requiresSuper: false },
  { id: "8", img: reviewtIcon, name: "Reviews", requiresSuper: false },
  { id: "9", img: quotes, name: "Quotes", requiresSuper: false },
  { id: "10", img: promotionIcon, name: "Promotion", requiresSuper: false },
  { id: "11", img: backUpIcon, name: "Backup", requiresSuper: false },
  { id: "12", img: settingIcon, name: "Setting", requiresSuper: false },
  { id: "13", img: helpIcon, name: "Help", requiresSuper: false },
];

export default dataSideBar;
