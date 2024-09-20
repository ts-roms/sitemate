import { useMutation, useQuery } from "react-query";
import { Issue } from "../model/issue-model"


export const useCreateIssue = (payload: Issue) => {

  const url = 'http://localhost:3333/api/issue-tracker';
  return useMutation({
    mutationKey: 'create-issue',
    mutationFn: async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      const result = await response.json()
      return result.data;
    }
  })

}

export const useReadIssue = (id: number) => {
  const url = `http://localhost:3333/api/issue-tracker/${id}`;
  return useQuery({
    queryKey: 'get-issue',
    queryFn: async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      return result.data;
    }
  })
}

export const useUpdateIssue = (id: number, payload: Issue) => {
  const url = `http://localhost:3333/api/issue-tracker/${id}`;
  return useMutation({
    mutationKey: 'update-issue',
    mutationFn: async () => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      const result = await response.json()
      return result.data;
    }
  })
}

export const useDeleteIssue = (id: number) => {
  const url = `http://localhost:3333/api/issue-tracker/${id}`;
  return useMutation({
    mutationKey: 'delete-issue',
    mutationFn: async () => {
      const response = await fetch(url, {
        method: 'DELTE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      return result.data;
    }
  })
}