import { GlassCard } from "./glass-card.jsx";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Star, MapPin, Shield, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./common/ImageWithFallback.jsx";
import { useNavigate } from "react-router";
function ProviderCard({ provider }) {
  const navigate = useNavigate();
  return <GlassCard hover className="overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden">
        <ImageWithFallback
    src={provider.image}
    alt={provider.name}
    className="w-full h-full object-cover"
  />
        {provider.featured && <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground border-0">
              Featured
            </Badge>
          </div>}
        {provider.verified && <div className="absolute top-3 right-3">
            <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-1.5">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </div>}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg mb-1">{provider.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {provider.location}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{provider.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({provider.reviews} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {provider.services.slice(0, 3).map((service) => <Badge
    key={service}
    variant="outline"
    className="text-xs border-primary/30 text-foreground/80"
  >
              {service}
            </Badge>)}
          {provider.services.length > 3 && <Badge
    variant="outline"
    className="text-xs border-primary/30 text-foreground/80"
  >
              +{provider.services.length - 3} more
            </Badge>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-semibold text-primary">
              ₹{provider.startingPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
    variant="outline"
    size="sm"
    className="border-primary/30"
  >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button
    size="sm"
    onClick={() => navigate(`/provider/${provider.id}`)}
    className="bg-primary text-primary-foreground hover:bg-primary/90"
  >
            View Profile
          </Button>
        </div>
      </div>
    </GlassCard>;
}
export {
  ProviderCard
};
