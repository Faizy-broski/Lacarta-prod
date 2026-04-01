import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@public/components/ui/dialog";
import { Input } from "@public/components/ui/input";
import { Textarea } from "@public/components/ui/textarea";
import { Button } from "@public/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@public/components/ui/select";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const inputStartRef = useRef<HTMLInputElement>(null);
  const inputEndRef = useRef<HTMLInputElement>(null);
  const [startvalue, setStartValue] = useState("");
  const [endvalue, setEndValue] = useState("");

  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
  if (ref.current?.showPicker) {
    ref.current.showPicker()
  } else {
    ref.current?.focus()
  }
}
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[95%] 
          max-w-3xl 
          max-h-[80vh]
          overflow-auto
          rounded-2xl 
          bg-[#f4f4f4] 
          p-6 sm:p-10 
          shadow-2xl
        "
      >
        {/* Header */}
        <DialogHeader className="relative">
          <DialogTitle className="font-antigua text-2xl text-black sm:text-3xl tracking-wide">
            Book With La Carta
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Fill the details for booking.
          </p>

          {/* <DialogClose className="absolute right-0 top-0 opacity-70 hover:opacity-100">
            <X className="w-5 h-5" />
          </DialogClose> */}
        </DialogHeader>

        {/* Form */}
        <div className="mt-6 space-y-6">
          <Input
            placeholder="Name"
            className="bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black"
          />

          <Input
            placeholder="Number"
            className="bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black"
          />

          <Input
            type="email"
            placeholder="Email"
            className="bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black"
          />

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="relative w-full">
              {/* Hidden Native Input */}
              <input
                ref={inputStartRef}
                type="date"
                value={startvalue}
                onChange={(e) => setStartValue(e.target.value)}
                className="absolute inset-0 opacity-0 pointer-events-none  w-full flex items-center justify-between border-0 border-b border-gray-300 pb-2 text-left bg-transparent rounded-none shadow-none focus:outline-none  h-10  border-input  px-3 py-2 text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />

              {/* Visible Styled Trigger */}
              <button
                type="button"
                onClick={() => openPicker(inputStartRef)}
                className="w-full flex items-center justify-between border-0 border-b border-gray-300 pb-2 text-left bg-transparent rounded-none shadow-none focus:outline-none  h-10  border-input  px-3 py-2 text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <span className={startvalue ? "text-black" : "text-gray-500"}>
                  {startvalue || "Start Date"}
                </span>

                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* End Date */}
            <div className="relative w-full">
              {/* Hidden Native Input */}
              <input
                ref={inputEndRef}
                type="date"
                value={endvalue}
                onChange={(e) => setEndValue(e.target.value)}
                className="absolute inset-0 opacity-0 pointer-events-none  w-full flex items-center justify-between border-0 border-b border-gray-300 pb-2 text-left bg-transparent rounded-none shadow-none focus:outline-none  h-10  border-input  px-3 py-2 text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />

              {/* Visible Styled Trigger */}
              <button
                type="button"
                onClick={() => openPicker(inputEndRef)}
                className="w-full flex items-center justify-between border-0 border-b border-gray-300 pb-2 text-left bg-transparent rounded-none shadow-none focus:outline-none  h-10  border-input  px-3 py-2 text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <span className={endvalue ? "text-black" : "text-gray-500"}>
                  {endvalue || "End Date"}
                </span>

                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          <Input
            placeholder="Group Size"
            className="bg-transparent border-0 border-b rounded-none shadow-none focus-visible:ring-0 text-black"
          />

          <Textarea
            placeholder="Comment"
            className="
              min-h-[150px] 
              resize-none 
              bg-transparent 
              border 
              rounded-xl 
              focus-visible:ring-0 text-black
            "
          />
        </div>

        {/* Button */}
        <div className="mt-8">
          <Button
            className="
              w-full 
              h-14 
              rounded-full 
              text-base 
              font-medium
              font-antigua
              bg-gradient-to-b
              from-gold
              to-gold-light
              text-white 
              hover:opacity-90
            "
          >
            Book with La Carta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
