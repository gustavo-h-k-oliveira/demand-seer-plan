
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

const UploadSection = ({ onUpload, isLoading }: UploadSectionProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  return (
    <section className="mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Faça Upload da Sua Planilha
          </h2>
          <p className="text-amber-700 text-lg">
            Suportamos arquivos Excel (.xlsx, .xls) e CSV
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-amber-400 bg-amber-100/70' 
              : 'border-amber-300 hover:border-amber-400 bg-white/60'
            }
            ${isLoading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center">
                {isDragActive ? (
                  <Upload className="w-8 h-8 text-white" />
                ) : (
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                )}
              </div>
            )}
            
            <div>
              {isLoading ? (
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Processando com IA...
                  </h3>
                  <p className="text-amber-700">
                    Analisando dados e gerando previsões
                  </p>
                </div>
              ) : isDragActive ? (
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Solte o arquivo aqui
                  </h3>
                  <p className="text-amber-700">
                    Vamos processar sua planilha automaticamente
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Arraste sua planilha aqui
                  </h3>
                  <p className="text-amber-700 mb-4">
                    ou clique para selecionar um arquivo
                  </p>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/80 border-amber-300 text-amber-800 hover:bg-amber-50"
                  >
                    Selecionar Arquivo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-amber-600">
            Formatos aceitos: .xlsx, .xls, .csv • Tamanho máximo: 10MB
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
