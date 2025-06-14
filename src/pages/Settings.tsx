
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useFontSize } from "@/hooks/useFontSize";

export default function Settings() {
  const { fontSize, increase, decrease, reset } = useFontSize();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Configurações</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-semibold mb-4">Preferências Gerais</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Tamanho da Fonte</label>
                <span className="text-gray-500">{{
                  "text-base": "Normal",
                  "text-lg": "Grande",
                  "text-xl": "Extra grande",
                }[fontSize]}</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={decrease} variant="outline">A-</Button>
                <Button onClick={reset} variant="ghost">Reset</Button>
                <Button onClick={increase} variant="outline">A+</Button>
              </div>
            </div>
            <div>
              <span className="text-gray-400">* Outras opções podem ser adicionadas futuramente.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
