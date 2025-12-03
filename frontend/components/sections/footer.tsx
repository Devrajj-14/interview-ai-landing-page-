"use client";

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
    <>
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(147, 71, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 50px rgba(147, 71, 255, 0.6);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
      {/* Statistics CTA Section */}
      <section className="bg-background pt-6 pb-16 md:pt-8 md:pb-20">
        <div className="mx-auto max-w-[1280px] px-10">
          <div className="text-center space-y-10 mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              <span className="text-primary">See How Much Time You Can Save</span>{" "}
              <span className="text-foreground">with Cops Interview!</span>
            </h2>
            <div className="flex justify-center">
              <a
                href="/hire"
                className="relative inline-block rounded-full bg-primary px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-2xl hover:scale-105 shadow-[0_0_30px_rgba(147,71,255,0.4)] animate-pulse-slow"
              >
                <span className="relative z-10">Talk to Our Expert</span>
                <span className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50"></span>
              </a>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-10 md:p-16">
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-16 text-foreground">
              Hire Smarter. Faster. With Zero Guesswork.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">70%</div>
                <p className="text-base text-foreground/70">
                  <span className="font-semibold text-foreground">Reduction</span> in Time, Cost & Effort
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">100%</div>
                <p className="text-base text-foreground/70">
                  <span className="font-semibold text-foreground">Increase</span> in Productivity
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">80%</div>
                <p className="text-base text-foreground/70">
                  <span className="font-semibold text-foreground">Better</span> Skill Matching
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="mx-auto max-w-[1280px] px-10 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold mb-2">Cops Interview</div>
              <p className="text-white/80 text-sm">The Modern-Age Talent Transformation Platform</p>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-24">
              {footerLinkColumns.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3 text-center md:text-left">
                  {column.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-base text-white/90 hover:text-white hover:underline"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>

            <a
              href="/hire"
              className="rounded-full bg-white text-primary px-8 py-3 text-base font-semibold transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex justify-center items-center gap-3 mt-8 pt-8 border-t border-white/20">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              >
                <div className="text-white">{social.icon}</div>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
