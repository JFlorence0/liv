import Image from "next/image";
import Link from "next/link";

interface PillarCardProps {
  icon: string;
  name: string;
  slug?: string;
  priority?: boolean;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon,
  name,
  slug,
  priority = false,
}) => {
  const pillarLink = slug ? `/pillars/${slug}` : "#";

  return (
    <Link
      href={pillarLink}
      className="flex flex-col items-center group cursor-pointer hover:transform hover:scale-105 !hover:no-underline transition-all duration-300"
    >
      <div className="w-[5.5rem] h-[5.5rem] sm:w-[6.25rem] sm:h-[6.25rem] md:w-28 md:h-28 relative">
        <Image
          src={icon}
          alt={name}
          width={112}
          height={112}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="w-full h-full object-contain"
          quality={90}
          sizes="(max-width: 640px) 88px, (max-width: 768px) 100px, 112px"
        />
      </div>
      <p className="text-center text-white text-xs sm:text-sm md:text-base mt-2 max-w-[80px] sm:max-w-[100px] group-hover:font-semibold">
        {name}
      </p>
    </Link>
  );
};

export default PillarCard;
