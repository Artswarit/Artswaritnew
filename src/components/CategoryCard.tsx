
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  slug: string;
}

const CategoryCard = ({ title, icon, count, slug }: CategoryCardProps) => {
  return (
    <Link to={`/explore?category=${slug}`} className="block h-full">
      <Card className="glass-card overflow-hidden hover-lift transition-all duration-300 h-full group hover:shadow-xl">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-artswarit-purple transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground text-sm">
            {count.toLocaleString()} artists
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
