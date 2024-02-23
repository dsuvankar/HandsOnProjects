import React from "react";

const Pagination = ({ products, total, page, setPage }) => {
  const handlePagination = (selectedPage) => {
    console.log("page", selectedPage);
    if (selectedPage >= 1 && selectedPage <= total / 10) {
      setPage(selectedPage);
    }
  };
  return (
    <>
      {products.length ? (
        <div className="pagination">
          <button onClick={() => page > 1 && handlePagination(page - 1)}>
            Left
          </button>

          {[...Array(Math.ceil(total / 10))].map((_, i) => {
            const isCurrentPage = page === i + 1;
            const fontSize = isCurrentPage ? "25px" : "18px";
            {
              return (
                <span
                  style={{
                    fontSize: fontSize,
                    backgroundColor: isCurrentPage ? "#E6E3E3" : "",
                  }}
                  key={i}
                  onClick={() => handlePagination(i + 1)}>
                  {i + 1}
                </span>
              );
            }
          })}

          <button
            onClick={() =>
              page < Math.ceil(total / 10) && handlePagination(page + 1)
            }>
            Right
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
