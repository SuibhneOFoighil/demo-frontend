import type { Paper } from "~/types";

export function downloadCsv(papers: Paper[], pdbId: string) {
  const headers = ["Title", "Authors", "Year", "Citations", "Relevance"];
  const csvContent = [
    headers.join(","),
    ...papers.map(paper => 
      [
        `"${paper.title}"`,
        `"${paper.authors}"`,
        paper.year,
        paper.citations,
        paper.relevance
      ].join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `research_results_${pdbId}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}