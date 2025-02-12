import React from "react";
import { AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/auth";

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  const { user, signInWithGoogle } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-sm">{description}</p>
      {!user && (
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 bg-[#7B89F4] text-white rounded-md hover:bg-[#8B99FF] transition-colors"
        >
          Sign in to get started
        </button>
      )}
    </div>
  );
};
