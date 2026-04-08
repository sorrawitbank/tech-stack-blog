import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Main from "./Main";
import AdminLayout from "@/layouts/AdminLayout";

function AdminCategoryForm({ mode }: { mode: "create" | "update" }) {
  return (
    <AdminLayout
      page="category"
      title={mode === "create" ? "Create category" : "Edit category"}
      leading={
        <Link to="/admin/category">
          <ChevronLeft className="size-6 text-brown-600 hover:text-brown-400 hover:cursor-pointer active:text-brown-500 sm:size-8" />
        </Link>
      }
    >
      <Main mode={mode} />
    </AdminLayout>
  );
}

export default AdminCategoryForm;
