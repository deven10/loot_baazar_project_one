import { Fragment } from "react";
import { FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export const Socials = () => {
  const socials = [
    {
      name: "Portfolio",
      component: <FaGlobe />,
      link: "https://deven-portfolio.netlify.app/",
    },
    {
      name: "LinkedIn",
      component: <FaLinkedin />,
      link: "https://www.linkedin.com/in/umraniadeven/",
    },
    {
      name: "Github",
      component: <FaGithub />,
      link: "https://github.com/deven10/",
    },
    {
      name: "Twitter",
      component: <FaTwitter />,
      link: "https://x.com/dumrania2000",
    },
  ];
  return (
    <div className="flex gap-4 cursor-pointe social-links">
      {socials.map((link) => (
        <Fragment key={link.name}>
          <Link
            to={link.link}
            target="_blank"
            data-tooltip-id={link.name}
            data-tooltip-content={link.name}
          >
            {link.component}
          </Link>
          <Tooltip id={link.name} />
        </Fragment>
      ))}
    </div>
  );
};
