
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedArtistCardProps {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  verified?: boolean;
  premium?: boolean;
}

const FeaturedArtistCard = ({
  id,
  name,
  category,
  imageUrl,
  verified = false,
  premium = false,
}: FeaturedArtistCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          {verified && (
            <Badge variant="outline" className="badge-verified">
              Verified
            </Badge>
          )}
          {premium && (
            <Badge variant="outline" className="badge-premium">
              Premium
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-heading text-lg font-semibold mb-1">
          <Link to={`/artist/${id}`} className="hover:text-artswarit-purple">
            {name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{category}</p>
        <Button asChild className="w-full" size="sm" variant="outline">
          <Link to={`/artist/${id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedArtistCard;
