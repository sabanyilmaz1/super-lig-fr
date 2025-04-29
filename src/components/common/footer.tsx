import Image from "next/image";
import Link from "next/link";
import { TwitterLogo } from "../icon/twitter";

const sections = [
  {
    title: "Super Lig",
    links: [
      { name: "Calendrier", href: "/fixture" },
      { name: "Classement", href: "/standing" },
    ],
  },
  {
    title: "Profil",
    links: [
      { name: "Aide", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Politique de confidentialité", href: "#" },
      { name: "Conditions d'utilisation", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="mt-10 py-10 bg-redsuperlig text-white ">
      <div className="container mx-auto">
        <footer>
          <div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              {/* Logo */}
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Superlig"
                    width={80}
                    height={80}
                  />
                </Link>
                <h2 className="text-xl font-semibold">Super Lig France</h2>
              </div>
              <ul className="flex items-center ">
                <li className="font-medium hover:text-primary">
                  <a
                    target="_blank"
                    href="https://twitter.com/superligfrance0"
                    className=""
                  >
                    <TwitterLogo width={40} height={40} color="text-white" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-white/80">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium lg:flex-row lg:items-center lg:text-left">
            <p>© 2025 Super Lig France. Tous droits réservés.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#"> Conditions d&apos;utilisation</a>
              </li>
              <li className="hover:text-primary">
                <a href="#"> Politique de confidentialité</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
