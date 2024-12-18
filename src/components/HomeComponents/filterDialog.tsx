"use client";

import * as React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function FilterDialog() {
  const [open, setOpen] = React.useState(false);
  const [enterDate, setEnterDate] = React.useState<Date>();
  const [exitDate, setExitDate] = React.useState<Date>();
  const [priceRange, setPriceRange] = React.useState([0]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="gap-2 bg-violet-600 hover:scale-95 transition-all"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Date Range Picker */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Enter After</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !enterDate && "text-muted-foreground"
                      )}
                    >
                      {enterDate ? format(enterDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={enterDate}
                      onSelect={setEnterDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <Label>Exit Before</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !exitDate && "text-muted-foreground"
                      )}
                    >
                      {exitDate ? format(exitDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={exitDate}
                      onSelect={setExitDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={10}
              />
              <div className="text-sm text-muted-foreground">
                Up to ${priceRange[0]}
              </div>
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bike">Bike/Scooter</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setEnterDate(undefined);
                setExitDate(undefined);
                setPriceRange([0]);
              }}
            >
              Reset All
            </Button>
            <Button onClick={() => setOpen(false)}>Apply Filters</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
