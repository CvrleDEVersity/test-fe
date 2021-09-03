import Pagination from "@material-ui/lab/Pagination";

const PaginationComponent = (props: any) => {
  return (
    <Pagination
      count={props.pages}
      onChange={props.handleChange}
      style={{ marginLeft: "35%" }}
    />
  );
};

export default PaginationComponent;
