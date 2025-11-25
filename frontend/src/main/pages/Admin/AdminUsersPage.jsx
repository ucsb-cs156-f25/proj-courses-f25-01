import React, { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersPaginated from "main/components/Users/UsersPaginated";
import { useBackend } from "main/utils/useBackend";

const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;                                 

  const {
    data: page,
    error: _error,
    status: _status,
  } = useBackend(
    [
      "/api/admin/users/paged",
      currentPage,
      pageSize
    ],
    {
      method: "GET",
      url: "/api/admin/users/paged",
      params: {
        page: currentPage - 1,
        size: pageSize,
        sort: "id"
      }
    },
    { content: [], totalPages: 1 }
  );

  return (
    <BasicLayout>
      <h2>Users</h2>

      <UsersPaginated
        users={page.content}
        totalPages={page.totalPages}
        onPageChange={setCurrentPage}
      />
    </BasicLayout>
  );
};

export default AdminUsersPage;
