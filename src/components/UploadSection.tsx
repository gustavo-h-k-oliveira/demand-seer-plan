
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Faça Upload da Sua Planilha
          </h2>
          <p className="text-gray-300 text-lg">
            Suportamos arquivos Excel (.xlsx, .xls) e CSV
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-purple-400 bg-purple-500/10' 
              : 'border-gray-600 hover:border-purple-500 bg-white/5'
            }
            ${isLoading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
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
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Processando com IA...
                  </h3>
                  <p className="text-gray-400">
                    Analisando dados e gerando previsões
                  </p>
                </div>
              ) : isDragActive ? (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Solte o arquivo aqui
                  </h3>
                  <p className="text-gray-400">
                    Vamos processar sua planilha automaticamente
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Arraste sua planilha aqui
                  </h3>
                  <p className="text-gray-400 mb-4">
                    ou clique para selecionar um arquivo
                  </p>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Selecionar Arquivo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Formatos aceitos: .xlsx, .xls, .csv • Tamanho máximo: 10MB
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
