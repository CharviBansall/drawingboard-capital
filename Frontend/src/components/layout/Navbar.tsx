import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/store/AuthContext";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import supabase from "@/lib/supabase";

export function Navbar() {
  const { user } = useAuth();
  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
  }
  return (
    <nav className="fixed text-sm top-0 bg-white py-2 px-4 w-full border-dashed border-gray-100 h-14 items-center justify-between flex flex-row border-b">
      <img
        src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets//Main%20dark.svg"
        className="h-full p-2 aspect-auto"
      />
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.user_metadata.picture} />
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
        <Button className="ml-2" variant={"outline"} onClick={logOut}>
          <LogOut />
          Logout
        </Button>
      </div>
    </nav>
  );
}
