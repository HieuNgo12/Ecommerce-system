import "./Sidebar.css";
export default function Sidebar() {
  const sideBarTab = [
    {
      link: "",
      title: "Woman's fashion",
      hasDropdown: true,
    },
    {
      link: "",
      title: "Men's fashion",
      hasDropdown: true,
    },
    {
      link: "",
      title: "Electronics",
    },
    {
      link: "",
      title: "Home & Lifestyle",
    },
    {
      link: "",
      title: "Medicine",
    },
    {
      link: "",
      title: "Sports & Outdoor",
    },
    {
      link: "",
      title: "Baby's & Toys",
    },
    {
      link: "",
      title: "Groceries & Pets",
    },
    {
      link: "",
      title: "Health & Beauty",
    },
  ];
  return (
    <div className="flex">
      <div class="flex grid grid-rows-3 w-80 grid-flow-col gap-4 text-left sidebar-exclusive mt-10 mb-10 ml-32 ">
        <div class="row-span-3 flex">
          <ul>
            {sideBarTab.map((tab) => {
              return (
                <li>
                  <div className="flex">
                    <a style={{ cursor: "pointer" }}>{tab.title}</a>
                    {/* {tab.hasDropdown? <img className=" ml-72 " src="./icons/dropdown.png"/> : null} */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div class="row-span-2 col-span-2 ..."></div>
      </div>
      <div class="row-span-3">
        <img src="./icons/home-page/banter-img.png" />
      </div>
    </div>
  );
}
