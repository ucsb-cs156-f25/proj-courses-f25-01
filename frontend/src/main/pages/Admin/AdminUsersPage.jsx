import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import OurPagination from "main/components/Users/OurPagination";

import { useBackend } from "main/utils/useBackend";
const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: usersPage, error: _error, status: _status } = useBackend(
    [`/api/admin/users/paginated?page=${currentPage - 1}`],
    {
      method: "GET",
      url: "/api/admin/users/paginated",
      params: { page: currentPage - 1, pageSize: 50 },
    },
    { content: [], page: { totalPages: 1 } }
  );

  return (
    <BasicLayout>
      <h2>Users</h2>
      <UsersPaginated
        users={usersPage.content}
        totalPages={usersPage.page.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </BasicLayout>
  );
};

export default AdminUsersPage;
