import "./footer.scss";

import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <div className="">Movie App</div>

      <div className="">&copy;{currentYear} Test Movie App</div>
    </div>
  );
};

export default Footer;
