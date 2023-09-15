import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image></Image>
        </Link>
      </div>
    </nav>
  );
};
