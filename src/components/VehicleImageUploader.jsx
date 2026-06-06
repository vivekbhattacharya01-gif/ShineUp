import { useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";
import { GlassCard } from "../app/components/glass-card.jsx";
import { cn } from "../app/components/ui/utils.js";

function VehicleImageUploader({ imageFile, onSelect, onRemove, error, isUploading }) {
  const previewUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const label = imageFile ? "Change Image" : "Upload Vehicle Image";

  return (
    <GlassCard className="p-6 mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Vehicle Image</h2>
          <p className="text-sm text-foreground/70">
            Use one clear exterior photo showing paint, headlights, and body panels.
          </p>
        </div>
        <div className="rounded-2xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          {isUploading ? "Uploading image..." : imageFile ? "Ready for analysis" : "Image required"}
        </div>
      </div>

      <label
        htmlFor="vehicle-image-upload"
        className={cn(
          "group mt-6 flex min-h-[240px] w-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-muted/60 p-6 text-center transition hover:border-primary/80 hover:bg-muted",
          imageFile ? "border-transparent bg-transparent" : ""
        )}
      >
        {imageFile ? (
          <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-slate-950/10">
            <img src={previewUrl} alt="Vehicle preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                onRemove();
              }}
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP up to 10MB</p>
            </div>
          </div>
        )}

        <input
          id="vehicle-image-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            const selected = event.target.files?.[0];
            if (selected) {
              onSelect(selected);
            }
          }}
        />
      </label>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
    </GlassCard>
  );
}

export { VehicleImageUploader };
