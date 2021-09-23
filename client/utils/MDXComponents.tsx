const MDXComponents = {
  a: (props) => (
    <a
      {...props}
      className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 hover:underline"
    />
  ),
};

export default MDXComponents;
