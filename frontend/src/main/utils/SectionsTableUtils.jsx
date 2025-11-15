import { toast } from "react-toastify";

export function objectToAxiosParams(data) {
  return {
    url: "/api/courses/post",
    method: "POST",
    params: {
      enrollCd: data.enrollCd.toString(),
      psId: data.psId.toString(),
    },
  };
}

export function onSuccess(response) {
  if (response.length < 3) {
    toast(
      `New course Created - id: ${response[0].id} enrollCd: ${response[0].enrollCd}`,
    );
  } else {
    toast(
      `Course ${response[0].enrollCd} replaced old section ${response[2].enrollCd} with new section ${response[1].enrollCd}`,
    );
  }
}

export function onError(error) {
  console.error("onError: error=", error);
  const message =
    error.response.data?.message ||
    `An unexpected error occurred adding the schedule: ${JSON.stringify(error)}`;
  toast.error(message);
}
