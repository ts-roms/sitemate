import { Issue } from "../model/issue-model"
import axios from "axios";

export const useCreateIssue = async (payload: Issue) => {
  const url = 'http://localhost:5000/api/issue-tracker';
  return await axios.post<Issue>(url, payload);
}

export const useGetIssues = async () => {
  const url = `http://localhost:5000/api/issue-tracker`;
   const data =  await axios.get<Issue[]>(url).then((response) => response.data);
   return data;
}

export const useUpdateIssue = async (id: string | undefined, payload: Issue) => {
  const url = `http://localhost:5000/api/issue-tracker/${id}`;
  return await axios.put(url, payload).then((response) => response.data);
}

export const useDeleteIssue = async (id: string | undefined) => {
  const url = `http://localhost:5000/api/issue-tracker/${id}`;
  return await axios.delete(url)

}