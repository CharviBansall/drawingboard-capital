import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <nav className="fixed text-sm top-0 bg-white py-2 px-4 w-full border-dashed border-gray-100 h-14 items-center justify-between flex flex-row border-b">
      <div className="h-full bg-gray-100 w-32">Logo Placeholder</div>
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src="https://picsum.photos/600" />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text- font-semibold tracking-tight">
            Danish D'souza
          </h4>
          <p className="text-xs text-muted-foreground">
            Hamlin, Hamlin & McGill
          </p>
        </div>
      </div>
    </nav>
  );
}
