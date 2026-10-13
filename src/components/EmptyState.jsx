import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ title, description, icon: Icon = Inbox }) {
  return (
    <div className="empty-state">
      <Icon size={26} style={{ marginBottom: 10, color: "var(--muted)" }} />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
