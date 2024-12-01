import { motion } from "framer-motion";
import { LoadingAnimation } from "../ui/loading-animation";
import type { FormData, LoadingStage } from "~/types";

interface ResearchFormCollapsedProps {
  formData: FormData;
  loadingStage: LoadingStage;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onCancel: () => void;
  onResubmit: () => void;
  onDownload: () => void;
}

export function ResearchFormCollapsed({
  formData,
  loadingStage,
  isExpanded,
  onExpand,
  onCollapse,
  onCancel,
  onResubmit,
  onDownload,
}: ResearchFormCollapsedProps) {
  const isLoading = loadingStage === "connecting" || loadingStage === "researching";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <LoadingAnimation stage={loadingStage} />
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>PDB ID: {formData.pdbId}</p>
            <p>Searches: {formData.numSearches}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {loadingStage === "completed" && (
            <button
              onClick={onDownload}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download
            </button>
          )}

          <button
            onClick={isLoading ? onCancel : onResubmit}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {isLoading ? "Cancel" : "New Search"}
          </button>

          <button
            onClick={isExpanded ? onCollapse : onExpand}
            className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}