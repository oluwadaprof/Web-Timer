import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateSelector = ({
  selectedDate,
  onDateChange,
}: DateSelectorProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-[280px] justify-start text-left font-normal hover:bg-[#3A3F4B]",
                !selectedDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#3A3F4B] border-[#4A4F5B]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateChange(date)}
              initialFocus
              className="bg-[#3A3F4B] text-white rounded-md"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption:
                  "flex justify-center pt-1 relative items-center text-white",
                caption_label: "text-sm font-medium text-white",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-[#4A4F5B] rounded-md",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#4A4F5B] h-9 w-9 rounded-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                day: "h-9 w-9 p-0 font-normal text-white aria-selected:opacity-100 hover:bg-[#4A4F5B] rounded-md hover:bg-[#4A4F5B] hover:text-white focus:bg-[#4A4F5B] focus:text-white",
                day_today: "bg-[#7B89F4] text-white",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-[#4A4F5B] aria-selected:text-white",
                day_hidden: "invisible",
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-[#3A3F4B]"
      >
        <Settings2 className="h-6 w-6" />
      </Button>
    </div>
  );
};
