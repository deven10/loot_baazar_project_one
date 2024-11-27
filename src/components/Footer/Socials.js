import { Fragment } from "react";
import { FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

export const Socials = () => {
  const socials = [
    { name: "Portfolio", component: <FaGlobe /> },
    { name: "LinkedIn", component: <FaLinkedin /> },
    { name: "Github", component: <FaGithub /> },
    { name: "Twitter", component: <FaTwitter /> },
  ];
  return (
    <div className="flex gap-4 cursor-pointer">
      {socials.map((link) => (
        <Fragment key={link.name}>
          <span data-tooltip-id={link.name} data-tooltip-content={link.name}>
            {link.component}
          </span>
          <Tooltip id={link.name} />
        </Fragment>
      ))}
    </div>
  );
};
