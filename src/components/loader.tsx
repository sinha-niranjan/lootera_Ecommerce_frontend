const Loader = () => {
  return <div> Loading ... </div>;
};

export default Loader;

export const Skeleton = ({
  width = "unset",
  length = 3,
}: {
  width?: string;
  length?: number;
}) => {
  const skeletons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeletonShape"></div>
  ));
  return (
    <div className="skeletonLoader" style={{ width }}>
     {skeletons}
    </div>
  );
};
