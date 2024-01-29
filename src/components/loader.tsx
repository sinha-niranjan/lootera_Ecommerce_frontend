const Loader = () => {
  return <div> Loading ... </div>;
};

export default Loader;

export const Skeleton = ({ width ="unset" }: { width ?: string }) => {
  return (
    <div className="skeletonLoader" style={{ width }}>
      <div className="skeletonShape"> </div>
      <div className="skeletonShape"></div>
      <div className="skeletonShape"></div>
    </div>
  );
};
