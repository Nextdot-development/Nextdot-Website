import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";
import BlogList from "./BlogList";
import BlogEditor from "./BlogEditor";
import Categories from "./Categories";
import Media from "./Media";
import Placeholder from "./Placeholder";

/**
 * The admin application — a self-contained, code-split React app mounted at
 * /admin with its own routes and chrome-free layout. The public site never
 * loads this code and its behaviour is completely unchanged.
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-paper text-ink antialiased">
        <Routes>
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
          <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/admin/blogs/:id/edit" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/admin/media" element={<ProtectedRoute><Media /></ProtectedRoute>} />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <Placeholder title="Settings" note="Site settings (default author, SEO defaults, publish pipeline) come in a later feature." />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
