"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function LocationSearch() {
  const [location, setLocation] = React.useState("");
  const [searching, setSearching] = React.useState(false);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      console.log("Searching for:", location);
      setSearching(false);
    }, 1000);
  };

  return (
    <div className=" py-6 px-16">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-8 py-6"
          />
          <MapPin className="absolute left-2 top-4 h-4 w-4 text-muted-foreground" />
        </div>
        <Button
          variant="default"
          className="py-6 px-10"
          onClick={handleSearch}
          disabled={searching || location.trim() === ""}
        >
          {searching ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
}
