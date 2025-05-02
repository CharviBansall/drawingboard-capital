import {
  AlertTriangle,
  Bell,
  BellDot,
  Briefcase,
  Building,
  Cpu,
  CreditCard,
  DoorClosed,
  DoorOpen,
  Folder,
  Gem,
  Globe,
  Heart,
  Hotel,
  House,
  Repeat,
  Rocket,
  ShoppingCart,
  Video,
  Zap,
} from "lucide-react";

import { Link } from "react-router";

export default function Funds() {
  const funds: (FundCardProps & { link: string })[] = [
    {
      imageUrl: "https://picsum.photos/id/10/1000",
      status: "new",
      name: "Cal Varnsen Growth Fund I",
      link: "/funds/cal-varnsen-growth-fund-i",
      description:
        "Invests in mid-market SaaS and healthcare companies across North America.",
      tags: ["Global", "Buyout", "Portfolio"],
      metrics: [
        { label: "Target Deals", value: "12-15" },
        { label: "Target Fund Size", value: "$80 Million" },
        { label: "Deals Sourced", value: "100+" },
        { label: "Min. investment", value: "$50,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/11/1000",
      status: "closed",
      name: "Art Vandelay Ventures II",
      link: "/funds/art-vandelay-ventures-ii",
      description:
        "Focuses on early-stage import/export tech with scalable supply chain solutions.",
      tags: ["Global", "VentureCapital"],
      metrics: [
        { label: "Portfolio Fund Targets", value: "8-12" },
        { label: "Strategy Focus", value: "FinTech, Manufacturing" },
        { label: "Deals Sourced", value: "75+" },
        { label: "Min. investment", value: "$100,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/12/1000",
      status: "new",
      name: "Monk’s Café Capital",
      link: "/funds/monks-cafe-capital",
      description:
        "A hospitality and real estate fund targeting high-yield locations in urban areas.",
      tags: ["RealEstate", "Hospitality"],
      metrics: [
        { label: "Target Deals", value: "10-14" },
        { label: "Target Fund Size", value: "$95 Million" },
        { label: "Deals Sourced", value: "120+" },
        { label: "Min. investment", value: "$75,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/13/1000",
      status: "closing_soon",
      name: "Del Boca Vista Opportunities",
      link: "/funds/del-boca-vista-opportunities",
      description:
        "Sunbelt-focused real estate fund emphasizing senior living and resort properties.",
      tags: ["RealEstate", "Retirement"],
      metrics: [
        { label: "Target Deals", value: "6-9" },
        { label: "Target Fund Size", value: "$40 Million" },
        { label: "Deals Sourced", value: "50+" },
        { label: "Min. investment", value: "$25,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/14/1000",
      status: "opening_soon",
      name: "Kruger Industrial Fund",
      link: "/funds/kruger-industrial-fund",
      description:
        "Industrial automation and B2B SaaS focused buyout strategy in Europe and Asia.",
      tags: ["Buyout", "IndustrialTech"],
      metrics: [
        { label: "Target Deals", value: "15-20" },
        { label: "Target Fund Size", value: "$120 Million" },
        { label: "Deals Sourced", value: "180+" },
        { label: "Min. investment", value: "$200,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/15/1000",
      status: "closed",
      name: "Pendant Publishing Partners",
      link: "/funds/pendant-publishing-partners",
      description:
        "Early-stage media, entertainment, and publishing investment opportunities.",
      tags: ["VentureCapital", "Media"],
      metrics: [
        { label: "Target Deals", value: "5-8" },
        { label: "Target Fund Size", value: "$35 Million" },
        { label: "Deals Sourced", value: "40+" },
        { label: "Min. investment", value: "$10,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/16/1000",
      status: "new",
      name: "J. Peterman Global Fund",
      link: "/funds/j-peterman-global-fund",
      description:
        "Luxury goods and high-end fashion private equity across Europe and Japan.",
      tags: ["Consumer", "Luxury"],
      metrics: [
        { label: "Target Deals", value: "7-10" },
        { label: "Target Fund Size", value: "$75 Million" },
        { label: "Deals Sourced", value: "90+" },
        { label: "Min. investment", value: "$60,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/17/1000",
      status: "closing_soon",
      name: "No Soup Holdings",
      link: "/funds/no-soup-holdings",
      description:
        "Focused on distressed turnaround investments in casual dining chains.",
      tags: ["Turnaround", "Hospitality"],
      metrics: [
        { label: "Target Deals", value: "9-12" },
        { label: "Target Fund Size", value: "$55 Million" },
        { label: "Deals Sourced", value: "65+" },
        { label: "Min. investment", value: "$40,000" },
      ],
    },
  ];

  return (
    <div className="w-full px-8 py-6">
      <div className="w-full flex flex-col gap-6 h-full">
        <span className="font-ebgaramond text-4xl">
          Invest in Indian funds alongside top GPs.
        </span>
        <span className="w-2/3 text-muted-foreground text-sm">
          Gain access to exclusive opportunities in the Indian markets by
          co-investing alongside top-tier General Partners (GPs). Leverage their
          expertise, due diligence, and deal flow to participate in
          institutional-quality investments typically reserved for large funds
          and insiders.
        </span>
        {funds.map((card, idx) => (
          <Link key={idx} to={card.link} style={{ textDecoration: "none" }}>
            <FundCard {...card} />
          </Link>
        ))}
      </div>
    </div>
  );

  type FundStatus = "new" | "closing_soon" | "opening_soon" | "closed";
  type FundTag =
    | "Global"
    | "Buyout"
    | "Portfolio"
    | "VentureCapital"
    | "RealEstate"
    | "Hospitality"
    | "Retirement"
    | "IndustrialTech"
    | "Media"
    | "Consumer"
    | "Luxury"
    | "Turnaround"
    | "Credit"
    | "SpecialSituations"
    | "Energy"
    | "Infrastructure";

  type FundCardProps = {
    imageUrl: string;
    status: FundStatus;
    name: string;
    description: string;
    tags: FundTag[]; // ideally an enum array too
    metrics: { label: string; value: string }[];
  };

  function FundCard({
    imageUrl,
    status,
    name,
    description,
    tags,
    metrics,
  }: FundCardProps) {
    return (
      <div
        className={`flex flex-row border border-gray-200 shadow-sm bg-white rounded-md w-full h-64 overflow-hidden`}
      >
        <div className="w-1/4 relative">
          {status === "new" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-green-100 py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <Bell className="text-green-600" size={12} />
              New
            </span>
          )}
          {status === "closed" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-red-100 py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <DoorClosed className="text-red-600" size={12} />
              Closed
            </span>
          )}
          {status === "closing_soon" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-yellow-100 py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <BellDot className="text-yellow-600" size={12} />
              Closing Soon
            </span>
          )}
          {status === "opening_soon" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-blue-100 py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <DoorOpen className="text-blue-600" size={12} />
              Opening Soon
            </span>
          )}
          <img
            src={imageUrl}
            className={`w-full ${
              status === "closed" && "grayscale"
            } aspect-auto relative`}
          />
        </div>
        <div className="flex flex-col gap-3 p-6 w-3/4">
          <span className="font-ebgaramond tracking-tight font-medium text-2xl decoration-1 hover:cursor-pointer hover:underline">
            {name}
          </span>
          <span className="text-sm text-muted-foreground">{description}</span>
          <div className="flex flex-row gap-2">
            {tags.map((tag, i) => TagItem(i, tag))}
          </div>
          <div className="grid h-24 grid-cols-4 my-3 grid-flow-row">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className={`w-full flex flex-col items-center justify-center h-full ${
                  i !== metrics.length - 1 ? "border-r border-gray-200" : ""
                }`}
              >
                <span className="font-ebgaramond text-lg">{metric.value}</span>
                <span className="text-muted-foreground text-sm">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    function TagPill({
      icon,
      label,
      key,
    }: {
      icon: React.ReactNode;
      label: string;
      key: number;
    }) {
      return (
        <div
          key={key}
          className="flex gap-1 items-center rounded-full text-xs px-3 py-1 bg-blue-4 text-blue-12 font-medium hover:bg-blue-5"
        >
          {icon}
          {label}
        </div>
      );
    }

    function TagItem(i: number, tag: FundTag) {
      const iconSize = 12;
      switch (tag) {
        case "Buyout":
          return (
            <TagPill
              key={i}
              icon={<Briefcase size={iconSize} />}
              label="Buyout"
            />
          );
        case "Global":
          return (
            <TagPill key={i} icon={<Globe size={iconSize} />} label="Global" />
          );
        case "Portfolio":
          return (
            <TagPill
              key={i}
              icon={<Folder size={iconSize} />}
              label="Portfolio"
            />
          );
        case "VentureCapital":
          return (
            <TagPill
              key={i}
              icon={<Rocket size={iconSize} />}
              label="Venture Capital"
            />
          );
        case "RealEstate":
          return (
            <TagPill
              key={i}
              icon={<House size={iconSize} />}
              label="Real Estate"
            />
          );
        case "Hospitality":
          return (
            <TagPill
              key={i}
              icon={<Hotel size={iconSize} />}
              label="Hospitality"
            />
          );
        case "Retirement":
          return (
            <TagPill
              key={i}
              icon={<Heart size={iconSize} />}
              label="Retirement"
            />
          );
        case "IndustrialTech":
          return (
            <TagPill
              key={i}
              icon={<Cpu size={iconSize} />}
              label="Industrial Tech"
            />
          );
        case "Media":
          return (
            <TagPill key={i} icon={<Video size={iconSize} />} label="Media" />
          );
        case "Consumer":
          return (
            <TagPill
              key={i}
              icon={<ShoppingCart size={iconSize} />}
              label="Consumer"
            />
          );
        case "Luxury":
          return (
            <TagPill key={i} icon={<Gem size={iconSize} />} label="Luxury" />
          );
        case "Turnaround":
          return (
            <TagPill
              key={i}
              icon={<Repeat size={iconSize} />}
              label="Turnaround"
            />
          );
        case "Credit":
          return (
            <TagPill
              key={i}
              icon={<CreditCard size={iconSize} />}
              label="Credit"
            />
          );
        case "SpecialSituations":
          return (
            <TagPill
              key={i}
              icon={<AlertTriangle />}
              label="Special Situations"
            />
          );
        case "Energy":
          return <TagPill key={i} icon={<Zap />} label="Energy" />;
        case "Infrastructure":
          return <TagPill key={i} icon={<Building />} label="Infrastructure" />;
        default:
          return null;
      }
    }
  }
}
