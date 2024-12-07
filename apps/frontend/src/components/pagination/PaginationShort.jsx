export default function PaginationShort(props) {
  // page handle

  return (
    <div className="flex justify-center items-center my-3 text-lg mr-10 text-colorTextPrimary">
      {props.page === 1 ? (
        <button
          disabled
          className="border border-colorBorder rounded-l px-3 py-1 mr-1 bg-colorBgThird "
        >
          Prev
        </button>
      ) : (
        <button
          onClick={() => {
            props.handlePageChange(props.page - 1);
          }}
          className="border  border-colorBorder rounded-l px-3 py-1 mr-1 cursor-pointer bg-colorBgSecondary hover:bg-colorBgThird"
        >
          Prev
        </button>
      )}

      {props.page === props.total ? (
        <button
          disabled
          className="border border-colorBorder rounded-r px-3 py-1 mr-1 bg-colorBgThird "
        >
          Next
        </button>
      ) : (
        <button
          onClick={() => {
            props.handlePageChange(props.page + 1);
          }}
          className="border  border-colorBorder rounded-r px-3 py-1 mr-1 cursor-pointer bg-colorBgSecondary hover:bg-colorBgThird"
        >
          Next
        </button>
      )}
    </div>
  );
}
