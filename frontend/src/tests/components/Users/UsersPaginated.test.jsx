import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import usersFixtures from "fixtures/usersFixtures";
import UsersPaginated from "main/components/Users/UsersPaginated";

describe("UsersPaginated additional tests", () => {
  test("shows 'No users found' when users array is empty", () => {
    const mockOnPageChange = vi.fn();

    render(
      <UsersPaginated
        users={[]}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  test("renders all three users with correct table values", () => {
  const onPageChange = vi.fn();
  const { content } = usersFixtures.threeUsersPage;

  render(
    <UsersPaginated
      users={content}
      totalPages={1}
      onPageChange={onPageChange}
    />
  );

  const base = "UsersPaginated";

  // Helper function to check a row
  const verifyRow = (rowIndex, user) => {
    expect(
      screen.getByTestId(`${base}-cell-row-${rowIndex}-col-id`)
    ).toHaveTextContent(user.id.toString());

    expect(
      screen.getByTestId(`${base}-cell-row-${rowIndex}-col-givenName`)
    ).toHaveTextContent(user.givenName);

    expect(
      screen.getByTestId(`${base}-cell-row-${rowIndex}-col-familyName`)
    ).toHaveTextContent(user.familyName);

    expect(
      screen.getByTestId(`${base}-cell-row-${rowIndex}-col-email`)
    ).toHaveTextContent(user.email);

    expect(
      screen.getByTestId(`${base}-cell-row-${rowIndex}-col-admin`)
    ).toHaveTextContent(user.admin.toString());
  };

    // Check each user
    verifyRow(0, content[0]);
    verifyRow(1, content[1]);
    verifyRow(2, content[2]);
});


  test("admin column displays 'true' or 'false' correctly for each row", () => {
    const mockOnPageChange = vi.fn();
    const { content } = usersFixtures.threeUsersPage;

    render(
      <UsersPaginated
        users={content}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    content.forEach((user, index) => {
      const adminCell = screen.getByTestId(
        `UsersPaginated-cell-row-${index}-col-admin`
      );
      expect(adminCell).toHaveTextContent(user.admin.toString());
    });
  });

  test("prev button is disabled on the first page", () => {
    const mockOnPageChange = vi.fn();
    const { content } = usersFixtures.threeUsersPage;

    render(
      <UsersPaginated
        users={content}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByTestId("OurPagination-prev");
    expect(prevButton).toBeDisabled();
  });

  test("next button is disabled on the last page", () => {
    const mockOnPageChange = vi.fn();
    const { content } = usersFixtures.threeUsersPage;

    render(
      <UsersPaginated
        users={content}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByTestId("OurPagination-next");
    expect(nextButton).toBeDisabled();
  });

  test("clicking next calls onPageChange with page 2", () => {
    const mockOnPageChange = vi.fn();
    const { content } = usersFixtures.threeUsersPage;

    render(
      <UsersPaginated
        users={content}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByTestId("OurPagination-next");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("renders exactly one table row per user", () => {
    const mockOnPageChange = vi.fn();
    const { content } = usersFixtures.threeUsersPage;

    render(
      <UsersPaginated
        users={content}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    const rowIdCells = screen.getAllByTestId(
      /UsersPaginated-cell-row-[0-9]+-col-id/
    );

    expect(rowIdCells.length).toBe(content.length);
  });

  test("each row contains all required column test IDs", () => {
    const mockOnPageChange = vi.fn();
    const { content } = usersFixtures.threeUsersPage;

    render(
      <UsersPaginated
        users={content}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    content.forEach((_, index) => {
      ["id", "givenName", "familyName", "email", "admin"].forEach((col) => {
        const cell = screen.getByTestId(
          `UsersPaginated-cell-row-${index}-col-${col}`
        );
        expect(cell).toBeInTheDocument();
      });
    });
  });
});
