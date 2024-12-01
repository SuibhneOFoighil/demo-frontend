import { motion } from "framer-motion";
import type { FormData, LoadingStage } from "~/types";

interface ResearchFormExpandedProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
  loadingStage: LoadingStage;
}

export function ResearchFormExpanded({
  onSubmit,
  initialData,
  loadingStage,
}: ResearchFormExpandedProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      pdbId: formData.get("pdbId") as string,
      numSearches: Number(formData.get("numSearches")),
      numPapersPerSearch: Number(formData.get("numPapersPerSearch")),
    });
  };

  const isDisabled = loadingStage === "connecting" || loadingStage === "researching";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="pdbId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Protein Data Bank ID
          </label>
          <input
            type="text"
            id="pdbId"
            name="pdbId"
            defaultValue={initialData.pdbId}
            disabled={isDisabled}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label
            htmlFor="numSearches"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Number of Searches
          </label>
          <input
            type="number"
            id="numSearches"
            name="numSearches"
            min="1"
            defaultValue={initialData.numSearches}
            disabled={isDisabled}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
            required
          />
        </div>

        <div>
          <label
            htmlFor="numPapersPerSearch"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Number of Papers per Search
          </label>
          <input
            type="number"
            id="numPapersPerSearch"
            name="numPapersPerSearch"
            min="1"
            defaultValue={initialData.numPapersPerSearch}
            disabled={isDisabled}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </motion.form>
  );
}