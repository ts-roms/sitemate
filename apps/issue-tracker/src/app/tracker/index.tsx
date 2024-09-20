type Props = {
  title: string;
};
export const Tracker = ({ title }: Props) => {
  const issues = [
    {
      id: 1,
      title: 'Issue1',
      description: 'This is issue 1',
    },
    {
      id: 2,
      title: 'Issue2',
      description: 'This is issue 2',
    },
    {
      id: 3,
      title: 'Issue3',
      description: 'This is issue 3',
    },
  ];
  return (
    <div>
      <h1>{title}</h1>

      <form className="border">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border"
        />{' '}
        <br />
        <textarea
          name="description"
          placeholder="Description"
          className="border"
          rows={2}
          cols={50}
        ></textarea>{' '}
        <br />
        <button>Submit</button>
      </form>

      <ul className="">
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title} - {issue.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
