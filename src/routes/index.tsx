import { createFileRoute } from "@tanstack/react-router";
import { ProcurementApp } from "@/components/procurement-app";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Gestão de Compras | GOLD CONTABILIDADE" },
    { name: "description", content: "Sistema interno de gestão de compras e ordens da GOLD CONTABILIDADE." },
    { property: "og:title", content: "Gestão de Compras | GOLD CONTABILIDADE" },
    { property: "og:description", content: "Sistema interno de gestão de compras e ordens da GOLD CONTABILIDADE." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <ProcurementApp />;
}
