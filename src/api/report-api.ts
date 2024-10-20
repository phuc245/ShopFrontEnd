import axiosClient from "@/api/axios-cilent";

export const reportsApi = {
  getReports: (option: string) => {
    const url = `reports/${option}`;
    return axiosClient(false).get(url);
  },
};
