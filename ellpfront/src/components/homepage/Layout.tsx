import { Sidebar } from "@/components/sidebar/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "240px", padding: "20px", width: "100%" }}>
        {children}
      </main>
    </div>
  );
};

export { Layout };
