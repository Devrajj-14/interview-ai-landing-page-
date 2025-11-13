import Image from "next/image";

const footerLinkColumns = [
  {
    links: [
      { name: "For Companies", href: "#" },
      { name: "For Candidates", href: "#" },
    ],
  },
  {
    links: [
      { name: "Blog", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  },
  {
    links: [
      { name: "About Us", href: "#" },
      { name: "Terms and Conditions", href: "#" },
      { name: "Privacy policy", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-foreground"
      >
        <path
          d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9493 7.05078C16.9493 6.55621 17.3481 6.15747 17.8427 6.15747C18.3373 6.15747 18.736 6.55621 18.736 7.05078C18.736 7.54535 18.3373 7.94409 17.8427 7.94409C17.3481 7.94409 16.9493 7.54535 16.9493 7.05078Z"
          fill="currentColor"
        />
        <path
          d="M12 15.6C13.9882 15.6 15.6 13.9882 15.6 12C15.6 10.0118 13.9882 8.4 12 8.4C10.0118 8.4 8.4 10.0118 8.4 12C8.4 13.9882 10.0118 15.6 12 15.6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-foreground"
      >
        <path
          d="M16.9493 7.05078C16.9493 6.55621 17.3481 6.15747 17.8427 6.15747C18.3373 6.15747 18.736 6.55621 18.736 7.05078C18.736 7.54535 18.3373 7.94409 17.8427 7.94409C17.3481 7.94409 16.9493 7.54535 16.9493 7.05078Z"
          fill="currentColor"
        />
        <path
          d="M20.4001 22V14.4C20.4001 11.232 19.8961 8.8 16.3441 8.8C14.7121 8.8 13.5601 9.696 13.0801 10.56H13.0081V9.12H9.14406V22H13.1281V15.6C13.1281 13.728 13.4881 11.904 15.5041 11.904C17.4721 11.904 17.5201 14.016 17.5201 15.744V22H20.4001Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.6 22V9.12H7.584V22H3.6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.584 5.66399C7.584 6.84303 6.64254 7.79999 5.592 7.79999C4.54146 7.79999 3.6 6.84303 3.6 5.66399C3.6 4.48495 4.54146 3.52799 5.592 3.52799C6.64254 3.52799 7.584 4.48495 7.584 5.66399Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-foreground"
      >
        <path
          d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto max-w-[1280px] px-10 py-12">
        <div className="flex flex-col items-center gap-12 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <a href="/" className="flex-shrink-0">
            <div className="text-3xl font-bold text-primary">Cops Interview</div>
          </a>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-24">
            {footerLinkColumns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base hover:underline"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 transition-colors hover:bg-foreground/10"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
