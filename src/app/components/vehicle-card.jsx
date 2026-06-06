import { GlassCard } from "./glass-card.jsx";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Calendar, FileText, Wrench } from "lucide-react";
import { ImageWithFallback } from "./Common/ImageWithFallback.jsx";
function VehicleCard({ vehicle, onSelect }) {
  return <GlassCard hover className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
    src={vehicle.image}
    alt={`${vehicle.brand} ${vehicle.model}`}
    className="w-full h-full object-cover"
  />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-primary-foreground border-0">
            {vehicle.type === "car" ? "Car" : "Bike"}
          </Badge>
        </div>
        {vehicle.healthScore && <div className="absolute top-3 right-3">
            <Badge
    className={`border-0 ${vehicle.healthScore >= 80 ? "bg-green-500/90" : vehicle.healthScore >= 60 ? "bg-yellow-500/90" : "bg-red-500/90"}`}
  >
              {vehicle.healthScore}% Health
            </Badge>
          </div>}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl mb-1">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-sm text-muted-foreground">
            {vehicle.year} • {vehicle.registration}
          </p>
        </div>

        {(vehicle.lastService || vehicle.nextService) && <div className="space-y-2 mb-4">
            {vehicle.lastService && <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Last Service: {vehicle.lastService}
              </div>}
            {vehicle.nextService && <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Wrench className="h-3 w-3" />
                Next Service: {vehicle.nextService}
              </div>}
          </div>}

        {onSelect && <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="border-primary/30">
              <FileText className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button
    size="sm"
    onClick={onSelect}
    className="bg-primary text-primary-foreground hover:bg-primary/90"
  >
              Select
            </Button>
          </div>}
      </div>
    </GlassCard>;
}
export {
  VehicleCard
};
