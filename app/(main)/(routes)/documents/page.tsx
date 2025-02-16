"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({
      title: "New Note",
    }).then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create new note",
    });
  };
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/createNotePage.png"
        height={500}
        width={500}
        className="dark:hidden"
        alt="Create Note"
      />
      <Image
        src="/createNotePage-dark.png"
        height={500}
        width={500}
        className="hidden dark:block"
        alt="Create Note"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notebook
      </h2>
      <Button onClick={() => onCreate()}>
        <PlusCircle className="mr-2 h-4 w-4" /> Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
