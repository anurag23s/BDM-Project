import React, { useState } from "react";
import { ImageOff } from "lucide-react";

// Shows a real photo if photoInfo.path is set and loads successfully.
// Otherwise shows an honest placeholder with instructions -- never a
// fabricated stand-in image, since this app never invents project facts.
export default function PhotoFrame({ path, caption }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !path || failed;

  return (
    <div>
      {showPlaceholder ? (
        <div
          style={{
            border: "1px dashed var(--hairline-strong)",
            borderRadius: 6,
            padding: "36px 20px",
            textAlign: "center",
            color: "var(--muted)",
            background: "#f7f8f7",
          }}
        >
          <ImageOff size={26} style={{ marginBottom: 10 }} />
          <div style={{ fontSize: 12.8, maxWidth: 340, margin: "0 auto" }}>
            No photo added yet. Place an image file in the <code>public/</code> folder and set its path in{" "}
            <code>src/data/about.js</code> (<code>photoInfo.path</code>) to display it here.
          </div>
        </div>
      ) : (
        <figure style={{ margin: 0 }}>
          <img
            src={path}
            alt={caption || "Armstrong Gym"}
            onError={() => setFailed(true)}
            style={{ width: "100%", borderRadius: 6, display: "block", border: "1px solid var(--hairline)" }}
          />
          {caption && (
            <figcaption style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 6 }}>{caption}</figcaption>
          )}
        </figure>
      )}
    </div>
  );
}
