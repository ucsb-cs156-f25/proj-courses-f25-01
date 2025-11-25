import React from "react";
import OurTable from "main/components/OurTable";
import OurPagination from "main/components/Utils/OurPagination";
import { Container } from "react-bootstrap";

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "First Name", accessorKey: "givenName" },
  { header: "Last Name", accessorKey: "familyName" },
  { header: "Email", accessorKey: "email" },
  {
    header: "Admin",
    id: "admin",
    cell: ({ cell }) => String(cell.row.original.admin),
  },
];

export default function UsersPaginated({ users, totalPages, onPageChange }) {
  return (
    <Container className="d-flex justify-content-center mt-4">
      <div style={{ width: "100%" }}>
        {/* Pagination */}
        <OurPagination
          updateActivePage={onPageChange}
          totalPages={totalPages}
        />

        {/* Table */}
        <OurTable
          data={users || []}
          columns={columns}
          testid={"UsersPaginated"}
        />
      </div>
    </Container>
  );
}
