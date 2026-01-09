import Card from "./Card";
import { pillars } from "@/utils/global";

interface PillarsSectionProps {
  bgColor?: string;
  showTitle?: boolean;
}

const PillarsSection: React.FC<PillarsSectionProps> = ({
  bgColor = "bg-[#578E7AA8]",
  showTitle = true,
}) => {
  const firstFourPillars = pillars.slice(0, 4);
  const lastThreePillars = pillars.slice(4);

  return (
    <div
      className={`w-full py-8 px-4 md:px-8 flex items-center justify-center ${bgColor}`}
    >
      <div className="max-w-6xl mx-auto">
        {showTitle && (
          <h1 className="text-center text-white text-3xl md:text-4xl lg:text-5xl font-medium mb-12 md:mb-16">
            Grounded in longevity science.{" "}
            <br className="sm:hidden" />
            Tailored to your biology
          </h1>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-[4.5rem] justify-items-center mb-6 md:mb-8">
          {firstFourPillars.map((pillar, index) => (
            <Card
              key={index}
              name={pillar.name}
              icon={pillar.icon}
              slug={pillar.slug}
              priority={true}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {lastThreePillars.slice(0, 2).map((pillar, index) => (
            <Card
              key={index + 4}
              name={pillar.name}
              icon={pillar.icon}
              slug={pillar.slug}
              priority={true}
            />
          ))}

          <div className="hidden md:block">
            <Card
              key={6}
              name={lastThreePillars[2].name}
              icon={lastThreePillars[2].icon}
              slug={lastThreePillars[2].slug}
              priority={true}
            />
          </div>
        </div>

        <div className="flex justify-center md:hidden mt-6">
          <Card
            key={6}
            name={lastThreePillars[2].name}
            icon={lastThreePillars[2].icon}
            slug={lastThreePillars[2].slug}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PillarsSection;
