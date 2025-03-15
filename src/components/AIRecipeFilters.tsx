
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Search, X, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AIRecipeFiltersProps {
  query: string;
  setQuery: (value: string) => void;
  ingredients: string;
  setIngredients: (value: string) => void;
  diet: string;
  setDiet: (value: string) => void;
  cuisine: string;
  setCuisine: (value: string) => void;
  excludeIngredients: string;
  setExcludeIngredients: (value: string) => void;
  loading: boolean;
  handleGenerateRecipes: (e: React.FormEvent) => Promise<void>;
  suggestedQueries: string[];
  handleSuggestedQuery: (query: string) => void;
  generatedRecipes: any[];
}

const dietOptions = [
  { value: '', label: 'أي نظام غذائي' },
  { value: 'نباتي', label: 'نباتي' },
  { value: 'خالي من الغلوتين', label: 'خالي من الغلوتين' },
  { value: 'قليل الكربوهيدرات', label: 'قليل الكربوهيدرات' },
  { value: 'كيتو', label: 'كيتو' },
  { value: 'باليو', label: 'باليو' },
  { value: 'صحي', label: 'صحي' },
  { value: 'منخفض السعرات', label: 'منخفض السعرات' },
];

const cuisineOptions = [
  { value: '', label: 'أي مطبخ' },
  { value: 'عربي', label: 'عربي' },
  { value: 'سعودي', label: 'سعودي' },
  { value: 'مصري', label: 'مصري' },
  { value: 'شامي', label: 'شامي' },
  { value: 'مغربي', label: 'مغربي' },
  { value: 'إيطالي', label: 'إيطالي' },
  { value: 'هندي', label: 'هندي' },
  { value: 'صيني', label: 'صيني' },
  { value: 'مكسيكي', label: 'مكسيكي' },
  { value: 'تركي', label: 'تركي' },
  { value: 'لبناني', label: 'لبناني' },
  { value: 'يمني', label: 'يمني' },
  { value: 'خليجي', label: 'خليجي' },
];

const AIRecipeFilters: React.FC<AIRecipeFiltersProps> = ({
  query,
  setQuery,
  ingredients,
  setIngredients,
  diet,
  setDiet,
  cuisine,
  setCuisine,
  excludeIngredients,
  setExcludeIngredients,
  loading,
  handleGenerateRecipes,
  suggestedQueries,
  handleSuggestedQuery,
  generatedRecipes
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);
  
  // Function to reset all filters
  const handleReset = () => {
    setQuery('');
    setIngredients('');
    setDiet('');
    setCuisine('');
    setExcludeIngredients('');
  };

  // Function to check if any filters are active
  const hasActiveFilters = () => {
    return diet !== '' || cuisine !== '' || excludeIngredients !== '';
  };

  return (
    <div className="lg:col-span-1">
      <div className="metaverse-card overflow-hidden sticky top-8 transition-all duration-300 hover:shadow-lg">
        <div className="p-6">
          <form onSubmit={handleGenerateRecipes}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white flex items-center justify-between">
                  <span>ماذا تريد أن تطبخ؟</span>
                  {query && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-white/70 hover:text-white"
                      onClick={() => setQuery('')}
                    >
                      <X className="h-3 w-3 mr-1" />
                      مسح
                    </Button>
                  )}
                </Label>
                <Textarea
                  id="ai-query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثل: وصفة صحية لعشاء سريع لشخصين..."
                  className="metaverse-input h-24 text-right transition-all duration-200 focus:border-primary/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center justify-between">
                  <span>المكونات المتوفرة لديك</span>
                  {ingredients && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-white/70 hover:text-white"
                      onClick={() => setIngredients('')}
                    >
                      <X className="h-3 w-3 mr-1" />
                      مسح
                    </Button>
                  )}
                </Label>
                <Textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="أدخل المكونات مفصولة بفواصل..."
                  className="metaverse-input h-24 text-right transition-all duration-200 focus:border-primary/50"
                />
              </div>
              
              {/* Collapsible Advanced Filters */}
              <Collapsible 
                open={isAdvancedOpen} 
                onOpenChange={setIsAdvancedOpen}
                className="border border-white/20 rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full flex items-center justify-between p-3 text-white hover:bg-white/10"
                  >
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      خيارات متقدمة
                    </div>
                    {hasActiveFilters() && (
                      <Badge className="bg-primary/80 text-white">
                        فلاتر نشطة
                      </Badge>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-4 bg-white/5">
                  <div className="space-y-2">
                    <Label className="text-white">النظام الغذائي</Label>
                    <Select value={diet} onValueChange={setDiet}>
                      <SelectTrigger className="metaverse-input text-right">
                        <SelectValue placeholder="أي نظام غذائي" />
                      </SelectTrigger>
                      <SelectContent>
                        {dietOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">المطبخ</Label>
                    <Select value={cuisine} onValueChange={setCuisine}>
                      <SelectTrigger className="metaverse-input text-right">
                        <SelectValue placeholder="أي مطبخ" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">مكونات تريد استبعادها</Label>
                    <Input
                      value={excludeIngredients}
                      onChange={(e) => setExcludeIngredients(e.target.value)}
                      placeholder="مثل: مكسرات، حليب..."
                      className="metaverse-input text-right"
                    />
                  </div>
                  
                  {hasActiveFilters() && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-white/20 text-white/90 hover:bg-white/10"
                      onClick={handleReset}
                    >
                      <X className="h-4 w-4 mr-2" />
                      إعادة ضبط جميع الفلاتر
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>
              
              <Button 
                type="submit" 
                className="metaverse-button w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    جاري إنشاء الوصفات...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    إنشاء وصفات ذكية
                  </>
                )}
              </Button>
            </div>
          </form>
          
          {!loading && generatedRecipes.length === 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-3">اقتراحات البحث</h3>
              <div className="space-y-2">
                {suggestedQueries.map((q, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start text-white border-white/20 hover:bg-white/10 transition-all duration-200 hover:border-white/40"
                    onClick={() => handleSuggestedQuery(q)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecipeFilters;
