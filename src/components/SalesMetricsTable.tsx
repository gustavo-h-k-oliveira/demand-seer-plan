
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  name: string;
  currentStock?: number;
  weight?: number;
  weightTarget?: number;
  salesPercentage?: number;
}

interface SalesMetricsTableProps {
  data: Product[];
}

const SalesMetricsTable = ({ data }: SalesMetricsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Generate weight data for products that don't have it
  const enrichedData = useMemo(() => {
    return data.map(product => ({
      ...product,
      weight: product.weight || Math.floor(Math.random() * 500) + 50,
      weightTarget: product.weightTarget || Math.floor(Math.random() * 700) + 300,
      salesPercentage: product.salesPercentage || Math.floor(Math.random() * 120) + 60
    }));
  }, [data]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return enrichedData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enrichedData, searchTerm]);

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-100 text-green-700 border-green-300';
    if (percentage >= 80) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const formatWeight = (value: number) => {
    return `${value.toLocaleString('pt-BR')} kg`;
  };

  return (
    <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-800">Métricas de Vendas</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-800"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="relative mt-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
            <Input
              placeholder="Filtrar por produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/90 border-orange-200 text-gray-800 placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-700">Produto</TableHead>
                  <TableHead className="text-gray-700">Estoque</TableHead>
                  <TableHead className="text-gray-700">Peso</TableHead>
                  <TableHead className="text-gray-700">Meta de Peso</TableHead>
                  <TableHead className="text-gray-700">% Vendas Realizadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product, index) => (
                    <TableRow key={index} className="hover:bg-orange-50">
                      <TableCell className="font-medium text-gray-800">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {product.currentStock?.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatWeight(product.weight || 0)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatWeight(product.weightTarget || 0)}
                      </TableCell>
                      <TableCell>
                        {product.salesPercentage !== undefined ? (
                          <Badge className={getPercentageColor(product.salesPercentage)}>
                            {product.salesPercentage}%
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SalesMetricsTable;
