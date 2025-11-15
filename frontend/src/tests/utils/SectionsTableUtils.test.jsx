import { vi } from "vitest";
import {
  onSuccess,
  onError,
  objectToAxiosParams,
} from "main/utils/SectionsTableUtils";
import mockConsole from "tests/testutils/mockConsole";

const mockToast = vi.fn();
mockToast.error = vi.fn();

vi.mock("react-toastify", async () => {
  const originalModule = await vi.importActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: mockToast,
  };
});

describe("SectionsTableUtils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("objectToAxiosParams", () => {
    test("should return the correct axios parameters", () => {
      const data = {
        enrollCd: 12345,
        psId: 15,
      };

      const result = objectToAxiosParams(data);

      expect(result).toEqual({
        url: "/api/courses/post",
        method: "POST",
        params: {
          enrollCd: "12345",
          psId: "15",
        },
      });
    });
  });

  describe("onSuccess", () => {
    test("should display a success message for new course creation", () => {
      const response = [{ id: 1, enrollCd: "12345" }];
      onSuccess(response);
      expect(mockToast).toHaveBeenCalledWith(
        "New course Created - id: 1 enrollCd: 12345",
      );
    });

    test("should display a success message for course replacement", () => {
      const response = [
        { enrollCd: "12345" },
        { enrollCd: "67890" },
        { enrollCd: "54321" },
      ];
      onSuccess(response);
      expect(mockToast).toHaveBeenCalledWith(
        "Course 12345 replaced old section 54321 with new section 67890",
      );
    });
  });

  describe("onError", () => {
    let restoreConsole;

    beforeEach(() => {
      restoreConsole = mockConsole();
    });

    afterEach(() => {
      restoreConsole();
    });

    test("should display an error message with the response data", () => {
      const error = {
        response: {
          data: { message: "An error occurred" },
        },
      };

      onError(error);

      expect(mockToast.error).toHaveBeenCalledWith("An error occurred");
      expect(console.error).toHaveBeenCalledWith("onError: error=", error);
    });

    test("should display a generic error message when no response data is available", () => {
      const error = {
        response: {},
      };
      onError(error);
      expect(mockToast.error).toHaveBeenCalledWith(
        "An unexpected error occurred adding the schedule: " +
          JSON.stringify(error),
      );
      expect(console.error).toHaveBeenCalledWith("onError: error=", error);
    });
  });
});
