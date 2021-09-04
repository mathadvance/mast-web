const MDXComponents = {
  a: (props) => (
    <a
      {...props}
      className="text-blue-500 hover:underline focus-visible:outline-black"
    />
  ),
};

export default MDXComponents;
