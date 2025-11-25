import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UsersPaginated from "main/components/Users/UsersPaginated";

import { useBackend } from "main/utils/useBackend";
const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 1-based page

  const {
    data: usersData,
    error: _error,
    status: _status,
  } = useBackend(
    [`/api/admin/users/paged?page=${currentPage - 1}`],
    {
      method: "GET",
      url: "/api/admin/users/paged",
      params: { page: currentPage - 1, size: 50 },
    },
    { content: [], page: { totalPages: 1 } }
  );

  return (
    <BasicLayout>
      <h2>Users</h2>
      <UsersPaginated
        users={usersData.content}
        totalPages={usersData.page.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </BasicLayout>
  );
};

export default AdminUsersPage;