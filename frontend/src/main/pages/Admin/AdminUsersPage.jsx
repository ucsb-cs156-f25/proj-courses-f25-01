import React, { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersPaginated from "main/components/Users/UsersPaginated";
import { useBackend } from "main/utils/useBackend";

const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: users,
    error: _error,
    status: _status,
  } = useBackend(
    [`/api/admin/users/paged?page=${currentPage - 1}`],
    {
      method: "GET",
      url: "/api/admin/users/paged",
      params: { page: currentPage - 1, size: 50, sort: "id" },
    },
    { content: [], page: { totalPages: 1 } } // default structure
  );

  return (
    <BasicLayout>
      <h2>Users</h2>
      <UsersPaginated
        users={users.content}
        currentPage={currentPage}
        totalPages={users.page.totalPages}
        onPageChange={setCurrentPage}
      />
    </BasicLayout>
  );
};

export default AdminUsersPage;
