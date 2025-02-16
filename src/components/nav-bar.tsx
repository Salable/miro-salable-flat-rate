import Link from "next/link";

export type NavLink = {
  label: string;
  url: string
}
export const NavBar = ({links, currentLink}: {links: NavLink[], currentLink: string}) => {

  return (
    <div className={`grid grid-cols-2 bg-gray-300 border-2 border-gray-300 rounded-md mb-6 border-solid`}>
      {links.map((link, i) => (
        <Link
          href={link.url}
          className={`py-2 text-center text-sm rounded-md ${link.url === currentLink ? 'bg-white' : ''}`}
          key={`nav-link-${i}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}