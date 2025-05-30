
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTrend: string;
  setSelectedTrend: (trend: string) => void;
  categories: string[];
  onClearFilters: () => void;
}

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedTrend,
  setSelectedTrend,
  categories,
  onClearFilters
}: FilterSectionProps) => {
  return (
    <Card className="bg-white/90 border-orange-200 backdrop-blur-lg mb-6 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <Input
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/90 border-orange-200 text-gray-800 placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/90 border-orange-200 text-gray-800">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedTrend} onValueChange={setSelectedTrend}>
            <SelectTrigger className="bg-white/90 border-orange-200 text-gray-800">
              <SelectValue placeholder="Tendência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as tendências</SelectItem>
              <SelectItem value="up">Em alta</SelectItem>
              <SelectItem value="stable">Estável</SelectItem>
              <SelectItem value="down">Em baixa</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="bg-white/90 border-orange-200 text-gray-700 hover:bg-orange-50"
          >
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
