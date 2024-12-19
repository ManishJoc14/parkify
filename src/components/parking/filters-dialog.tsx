import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ParkingFeature, VehicleType } from "@/types/definitions";

interface FiltersDialogProps {
  setActiveFilters?: (filters: {
    vehicle_type: VehicleType[];
    features: ParkingFeature[];
  }) => void;
}

export function FiltersDialog({ setActiveFilters }: FiltersDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState<VehicleType[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<ParkingFeature[]>(
    []
  );

  useEffect(() => {
    setActiveFilters?.({
      vehicle_type: selectedVehicles,
      features: selectedFeatures,
    });
  }, [selectedVehicles, setActiveFilters, selectedFeatures]);

  const handleClearFilters = () => {
    setSelectedVehicles([]);
    setSelectedFeatures([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          Filters
          {(selectedVehicles.length > 0 || selectedFeatures.length > 0) && (
            <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
              {selectedVehicles.length + selectedFeatures.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between rounded-sm bg-emerald-500 -mx-6 -mt-6 p-6 text-white">
          <DialogTitle className="text-xl font-mont-medium">
            Filters
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-emerald-600 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-6">
          <div className="space-y-4 pt-2">
            <div className="space-y-4">
              <h3 className="text-xl font-mont-medium">Vehicle Type</h3>
              <p className="text-sm text-muted-foreground">
                Display parking spaces that accommodate
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(VehicleType).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      id={key}
                      checked={selectedVehicles.includes(key as VehicleType)}
                      onCheckedChange={(checked) => {
                        setSelectedVehicles((prev) =>
                          checked
                            ? [...prev, key as VehicleType]
                            : prev.filter((v) => v !== key)
                        );
                      }}
                    />
                    <label
                      htmlFor={key}
                      className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-mont-medium">Parking Features</h3>
              <p className="text-sm text-muted-foreground">
                Show spaces that include these features
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(ParkingFeature).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      id={key}
                      checked={selectedFeatures.includes(key as ParkingFeature)}
                      onCheckedChange={(checked) => {
                        setSelectedFeatures((prev) =>
                          checked
                            ? [...prev, key as ParkingFeature]
                            : prev.filter((f) => f !== key)
                        );
                      }}
                    />
                    <label
                      htmlFor={key}
                      className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center gap-4 pt-6">
          <Button
            variant="default"
            className="flex-1 font-mont-bold bg-red-500 hover:bg-red-700"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
          {/* <Button
            className="flex-1 font-mont-medium bg-emerald-500 hover:bg-emerald-600"
            onClick={handleApplyFilters}
          >
            Apply filters
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
