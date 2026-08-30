import Image from "next/image";
export default function Logo() {
  return (
    <div className="flex gap-0.5 items-center">
      <Image
        src="/rodeoLogo.svg"
        alt="Um chapeu de cowboy"
        width={32}
        height={32}
      />
      <span className="text-xs md:text-lg font-semibold font-heading text-text">
        rodeoArena
      </span>
    </div>
  );
}
