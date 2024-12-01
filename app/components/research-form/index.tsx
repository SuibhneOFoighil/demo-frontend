import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ResearchFormExpanded } from "./research-form-expanded";
import { ResearchFormCollapsed } from "./research-form-collapsed";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { ResearchTable } from "../research-table";
import { useWebSocket } from "~/hooks/useWebSocket";
import { downloadCsv } from "~/utils/csv";
import type { FormData } from "~/types";

export function ResearchForm() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    pdbId: "",
    numSearches: 1,
    numPapersPerSearch: 1,
  });

  const { loadingStage, papers, connect, disconnect, resetState } = useWebSocket();

  const handleSubmit = async (data: FormData) => {
    setFormData(data);
    setIsExpanded(false);
    connect(data);
  };

  const handleCancel = () => {
    disconnect();
    setIsExpanded(true);
  };

  const handleResubmit = () => {
    if (loadingStage === "completed" || loadingStage === "canceled") {
      setShowConfirmation(true);
    }
  };

  const handleConfirmResubmit = () => {
    setShowConfirmation(false);
    resetState();
    setIsExpanded(true);
  };

  const handleDownload = () => {
    downloadCsv(papers, formData.pdbId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {loadingStage !== "idle" && (
        <ResearchFormCollapsed
          formData={formData}
          loadingStage={loadingStage}
          isExpanded={isExpanded}
          onExpand={() => setIsExpanded(true)}
          onCollapse={() => setIsExpanded(false)}
          onCancel={handleCancel}
          onResubmit={handleResubmit}
          onDownload={handleDownload}
        />
      )}
      
      <AnimatePresence mode="wait">
        {isExpanded && (
          <ResearchFormExpanded
            key="expanded"
            onSubmit={handleSubmit}
            initialData={formData}
            loadingStage={loadingStage}
          />
        )}
      </AnimatePresence>

      <ResearchTable papers={papers} />

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmResubmit}
        title="Discard Current Results?"
        description="Are you sure you want to discard the current results and start a new search?"
      />
    </div>
  );
}