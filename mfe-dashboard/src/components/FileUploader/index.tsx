import React from "react";

type FileUploaderProps = {
  label?: string;
  onFileSelect: (file: File | null) => void;
};

export function FileUploader({ label = "", onFileSelect }: FileUploaderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className="mb-2">
      <label className="form-label d-block">{label}</label>
      <input type="file" className="form-control" onChange={handleChange} />
    </div>
  );
}
