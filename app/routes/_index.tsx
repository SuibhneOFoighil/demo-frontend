import type { MetaFunction } from "@remix-run/node";
import { ResearchForm } from "~/components/research-form";

export const meta: MetaFunction = () => {
  return [
    { title: "Research Form" },
    { name: "description", content: "Research form with loading visualization" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Research Form
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your research parameters below
          </p>
        </div>
        <ResearchForm />
      </div>
    </div>
  );
}