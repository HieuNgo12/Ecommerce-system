import React from "react";
import "./TitleBanter.css";

function Banter({ title, ...props }) {
  return <div className="text-banter flex text-left mb-11 mt-11">
    <div>
      <img src="./icons/social-media/red-banter.png"/>
    </div>
    {title}
    </div>;
}

export default Banter;
