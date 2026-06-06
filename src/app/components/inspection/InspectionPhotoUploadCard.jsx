import { useEffect, useMemo } from "react";
import { Upload, X, Check } from "lucide-react";
import { GlassCard } from "../glass-card.jsx";
import { cn } from "../ui/utils.js";

function InspectionPhotoUploadCard({
  label,
  file,
  onFileChange,
  onRemove,
  isRequired = false
}) {
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <GlassCard className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {isRequired ? (
            <p className="text-xs text-muted-foreground">Required for analysis</p>
          ) : null}
        </div>
        {file ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-accent/70"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <label
        htmlFor="inspection-photo-upload"
        className={cn(
          "group flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/60 p-6 text-center transition hover:border-primary/80 hover:bg-muted",
          file ? "border-transparent bg-transparent" : ""
        )}
      >
        {file ? (
          <>
            <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-950/10">
              <img
                src={previewUrl}
                alt="Uploaded vehicle preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
              <Check className="h-4 w-4" />
              Uploaded image ready for inspection
            </div>
          </>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Upload a clear vehicle photo</p>
              <p className="text-xs text-muted-foreground">
                Use a front-facing exterior photo for the best analysis.
              </p>
            </div>
          </>
        )}

        <input
          id="inspection-photo-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const selected = event.target.files?.[0];
            if (selected) {
              onFileChange(selected);
            }
          }}
        />
      </label>
    </GlassCard>
  );
}

export { InspectionPhotoUploadCard };
