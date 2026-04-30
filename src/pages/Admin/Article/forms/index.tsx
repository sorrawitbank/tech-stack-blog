import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Main from "./Main";
import AdminLayout from "@/layouts/AdminLayout";

function AdminArticleForm({ mode }: { mode: "create" | "update" }) {
  const location = useLocation();

  const fromSearch = location.state?.fromSearch ?? "";
  const backTo = `/admin/article${fromSearch}`;

  return (
    <AdminLayout
      page="article"
      title={mode === "create" ? "Create article" : "Edit article"}
      leading={
        <Link to={backTo}>
          <ChevronLeft className="size-6 text-brown-600 hover:text-brown-400 hover:cursor-pointer active:text-brown-500 sm:size-8" />
        </Link>
      }
    >
      <Main mode={mode} />
    </AdminLayout>
  );
}

export default AdminArticleForm;
