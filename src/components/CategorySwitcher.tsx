import { Button } from "@/components/ui/button";

interface CategorySwitcherProps {
  activeCategory: "ccm-cm" | "doctor";
  onCategoryChange: (category: "ccm-cm" | "doctor") => void;
}

export const CategorySwitcher = ({ activeCategory, onCategoryChange }: CategorySwitcherProps) => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/95 to-secondary/95 backdrop-blur-sm border-b border-primary/20 shadow-lg">
     
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-3">
          <span className="text-sm text-primary-foreground/80 mr-2">Select your role:</span>
          <Button
            variant={activeCategory === "ccm-cm" ? "secondary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange("ccm-cm")}
            className={activeCategory === "ccm-cm" ? "" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}
          >
            Care Manager (CCM/CM)
          </Button>
          <Button
            variant={activeCategory === "doctor" ? "secondary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange("doctor")}
            className={activeCategory === "doctor" ? "" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}
          >
            Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};
