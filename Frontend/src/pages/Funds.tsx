import { Button } from "@/components/ui/button";
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

export default function Funds() {
  const funds: FundCardProps[] = [
    {
      imageUrl: "https://picsum.photos/id/10/1000",
      status: "new",
      name: "Cal Varnsen Growth Fund I",
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
      description:
        "Focuses on early-stage import/export tech with scalable supply chain solutions.",
      tags: ["Global", "VentureCapital"],
      metrics: [
        { label: "Target Deals", value: "8-12" },
        { label: "Target Fund Size", value: "$60 Million" },
        { label: "Deals Sourced", value: "75+" },
        { label: "Min. investment", value: "$100,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/12/1000",
      status: "new",
      name: "Monk’s Café Capital",
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
    {
      imageUrl: "https://picsum.photos/id/18/1000",
      status: "opening_soon",
      name: "Bada Bing Capital",
      description:
        "High-risk, high-return structured credit and special situations play.",
      tags: ["Credit", "SpecialSituations"],
      metrics: [
        { label: "Target Deals", value: "6-10" },
        { label: "Target Fund Size", value: "$100 Million" },
        { label: "Deals Sourced", value: "85+" },
        { label: "Min. investment", value: "$150,000" },
      ],
    },
    {
      imageUrl: "https://picsum.photos/id/19/1000",
      status: "closed",
      name: "The Costanza Initiative",
      description:
        "Focusing on clean energy infrastructure projects across emerging markets.",
      tags: ["Energy", "Infrastructure"],
      metrics: [
        { label: "Target Deals", value: "14-18" },
        { label: "Target Fund Size", value: "$150 Million" },
        { label: "Deals Sourced", value: "130+" },
        { label: "Min. investment", value: "$300,000" },
      ],
    },
  ];

  return (
    <div className="h-fit overflow-scroll-y w-screen bg-gray-50 flex flex-row">
      <div className="w-full flex flex-col gap-6 p-12 h-full">
        <span className="font-EBGaramond text-5xl">
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
          <FundCard key={idx} {...card} />
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
        className={`flex flex-row border shadow-sm bg-white rounded-md w-full h-64 overflow-hidden`}
      >
        <div className="w-1/4 relative">
          {status === "new" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-green-100 border py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <Bell className="text-green-600" size={12} />
              New
            </span>
          )}
          {status === "closed" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-red-100 border py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <DoorClosed className="text-red-600" size={12} />
              Closed
            </span>
          )}
          {status === "closing_soon" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-yellow-100 border py-1 px-2 rounded-md text-xs flex flex-row gap-1">
              <BellDot className="text-yellow-600" size={12} />
              Closing Soon
            </span>
          )}
          {status === "opening_soon" && (
            <span className="absolute font-medium z-10 items-center top-2 left-2 bg-blue-100 border py-1 px-2 rounded-md text-xs flex flex-row gap-1">
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
          <span className="font-EBGaramond tracking-tight font-medium text-2xl decoration-1 hover:cursor-pointer hover:underline">
            {name}
          </span>
          <span className="text-sm text-muted-foreground">{description}</span>
          <div className="flex flex-row gap-2">
            {tags.map((tag, i) => TagItem(i, tag))}
          </div>
          <div className="grid h-24 grid-cols-4 grid-flow-row">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className={`w-full flex flex-col items-center justify-center h-full ${
                  i !== metrics.length - 1 ? "border-r" : ""
                }`}
              >
                <span className="font-EBGaramond text-xl">{metric.value}</span>
                <span className="text-muted-foreground text-sm">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    function TagItem(i: number, tag: FundTag) {
      switch (tag) {
        case "Buyout":
          return (
            <Button key={i} variant={"ghost"}>
              <Briefcase />
              Buyout
            </Button>
          );
        case "Global":
          return (
            <Button key={i} variant={"ghost"}>
              <Globe />
              Global
            </Button>
          );
        case "Portfolio":
          return (
            <Button key={i} variant={"ghost"}>
              <Folder />
              Portfolio
            </Button>
          );
        case "VentureCapital":
          return (
            <Button key={i} variant={"ghost"}>
              <Rocket />
              Venture Capital
            </Button>
          );
        case "RealEstate":
          return (
            <Button key={i} variant={"ghost"}>
              <House />
              Real Estate
            </Button>
          );
        case "Hospitality":
          return (
            <Button key={i} variant={"ghost"}>
              <Hotel />
              Hospitality
            </Button>
          );
        case "Retirement":
          return (
            <Button key={i} variant={"ghost"}>
              <Heart />
              Retirement
            </Button>
          );
        case "IndustrialTech":
          return (
            <Button key={i} variant={"ghost"}>
              <Cpu />
              Industrial Tech
            </Button>
          );
        case "Media":
          return (
            <Button key={i} variant={"ghost"}>
              <Video />
              Media
            </Button>
          );
        case "Consumer":
          return (
            <Button key={i} variant={"ghost"}>
              <ShoppingCart />
              Consumer
            </Button>
          );
        case "Luxury":
          return (
            <Button key={i} variant={"ghost"}>
              <Gem />
              Luxury
            </Button>
          );
        case "Turnaround":
          return (
            <Button key={i} variant={"ghost"}>
              <Repeat />
              Turnaround
            </Button>
          );
        case "Credit":
          return (
            <Button key={i} variant={"ghost"}>
              <CreditCard />
              Credit
            </Button>
          );
        case "SpecialSituations":
          return (
            <Button key={i} variant={"ghost"}>
              <AlertTriangle />
              Special Situations
            </Button>
          );
        case "Energy":
          return (
            <Button key={i} variant={"ghost"}>
              <Zap />
              Energy
            </Button>
          );
        case "Infrastructure":
          return (
            <Button key={i} variant={"ghost"}>
              <Building />
              Infrastructure
            </Button>
          );
        default:
          return null;
      }
    }
  }
}
