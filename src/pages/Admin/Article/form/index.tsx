import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Main from "./Main";
import AdminLayout from "@/layouts/AdminLayout";

function AdminArticleForm({ mode }: { mode: "create" | "update" }) {
  return (
    <AdminLayout
      page="article"
      title={mode === "create" ? "Create article" : "Edit article"}
      leading={
        <Link to="/admin/article">
          <ChevronLeft className="size-6 text-brown-600 hover:text-brown-400 hover:cursor-pointer active:text-brown-500 sm:size-8" />
        </Link>
      }
    >
      <Main mode={mode} />
    </AdminLayout>
  );
}

export default AdminArticleForm;
