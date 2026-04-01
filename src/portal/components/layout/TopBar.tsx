import { Mail, Globe, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <div className="w-full bg-gradient-to-b from-gold to-gold-light text-white text-sm w-full mx-auto px-6 md:px-20 py-2 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 " />
        <span className="">hola@lacarta.co</span>
      </div>

      {/* CENTER */}
      <div className="hidden lg:block font-medium text-center">
        Download our FREE Cartagena Travel Guide!
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="hidden lg:inline cursor-pointer hover:underline">
          Advertise With Us
        </span>

        <div className="flex items-center gap-1 cursor-pointer">
          <Globe className="w-4 h-4" />
          <span>EN</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
