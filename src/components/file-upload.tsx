import { useState, useRef, useCallback } from "react";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadedFile {
  name: string;
  size: number;
  status: "uploading" | "complete" | "error";
  error?: string;
}

interface FileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesChanged?: (files: UploadedFile[]) => void;
  className?: string;
}

export function FileUpload({
  accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  maxSizeMB = 10,
  multiple = true,
  onFilesChanged,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      status: "complete" as const,
    }));
    const updated = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updated);
    onFilesChanged?.(updated);
  }, [files, multiple, onFilesChanged]);

  const removeFile = useCallback((index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChanged?.(updated);
  }, [files, onFilesChanged]);

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/20",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Drop files here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">
              Accepted: {accept} · Max {maxSizeMB}MB per file
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/20 transition-colors group"
            >
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                <File className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{file.name}</div>
                <div className="text-xs text-muted-foreground">{formatSize(file.size)}</div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === "complete" && <CheckCircle2 className="h-4 w-4 text-success" />}
                {file.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" title={file.error} />}
                {file.status === "uploading" && (
                  <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
