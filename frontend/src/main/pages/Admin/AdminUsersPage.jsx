import React, { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersPaginated from "main/components/Users/UsersPaginated";
import { useBackend } from "main/utils/useBackend";

const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 1-based for UI

  const {
    data: usersData,
    error: _error,
    status: _status,
  } = useBackend(
    [`/api/admin/users/paged?page=${currentPage - 1}`], // 0-based for backend
    {
      method: "GET",
      url: "/api/admin/users/paged",
      params: { page: currentPage - 1, size: 50 }, // adjust page size if needed
    },
    { content: [], totalPages: 1 } // default while loading
  );

  // Debugging
  console.log("usersData:", usersData);

  return (
    <BasicLayout>
      <h2>Users</h2>
      <UsersPaginated
        users={usersData?.content || []}
        totalPages={usersData?.totalPages || 1}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </BasicLayout>
  );
};

export default AdminUsersPage;
