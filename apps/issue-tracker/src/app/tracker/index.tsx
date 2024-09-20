import { useEffect, useState } from 'react';
import {
  useCreateIssue,
  useDeleteIssue,
  useGetIssues,
  useUpdateIssue,
} from './api';
import { Issue } from './model/issue-model';

type Props = {
  title: string;
};
export const Tracker = ({ title }: Props) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const data = await useGetIssues();
      setIssues(data);
    })();
  }, []);

  const [values, setValues] = useState<Issue>({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };
  const handleCreateIssue = () => {
    useCreateIssue(values);
  };

  const handleDeleteIssue = (id: string | undefined) => {
    useDeleteIssue(id);
  };

  const handleGetIssue = (issue: Issue) => {
    setValues({ title: issue.title, description: issue.description });
    setIsEditMode(true);
    setSelectedId(issue._id);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setValues({ title: '', description: '' });
    setSelectedId(undefined);
  };

  const handleUpdateIssue = (issue: Issue) => {
    useUpdateIssue(selectedId, issue);
  };

  return (
    <div className="flex justify-center m-auto">
      <div className="w-full max-w-lg">
        <h1 className="text-lg text-center">{title}</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="border w-full rounded py-2 pl-2"
              onChange={handleInputChange}
              value={values.title}
            />
          </div>
          <div className="mb-6">
            <textarea
              name="description"
              placeholder="Description"
              className="border w-full pl-2"
              onChange={handleInputChange}
              value={values.description}
            ></textarea>
          </div>
          {!isEditMode ? (
            <button onClick={handleCreateIssue}>Submit</button>
          ) : (
            <div className="flex gap-5 justify-between">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={() => handleUpdateIssue(values)}>Update</button>
            </div>
          )}
        </form>

        <ul className="border mt-4 shadow-md">
          {issues.length > 0 ? issues.map((issue: Issue) => (
            <li key={issue._id} className="py-2 mx-10 cursor-pointer list-disc flex justify-between">
              <div onClick={() => handleGetIssue(issue)} className='block cursor-pointer'>
                <label className='text-lg font-bold'>{issue.title}</label>
                <div>
                  <span className='text-sm'>{issue.description}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteIssue(issue._id)}
                className="bg-slate-600 text-white p-2 rounded-sm"
              >
                Delete
              </button>
            </li>
          )): 
          <li className='text-center my-2'>No data</li>}
        </ul>
      </div>
    </div>
  );
};
