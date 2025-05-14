
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  icon: JSX.Element;
  count: number;
  slug: string;
  color?: string;
}

const CategoryCard = ({ title, icon, count, slug, color = "bg-artswarit-purple" }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-6 flex items-center space-x-4">
          <div className={`${color} h-12 w-12 rounded-full flex items-center justify-center text-white`}>
            {icon}
          </div>
          <div>
            <h3 className="font-heading text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{count} artists</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
