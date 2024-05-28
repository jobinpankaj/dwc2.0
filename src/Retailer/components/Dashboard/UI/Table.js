import React from "react";

// this is a dynamic table.
// pass heading as key of data to the table.
// also add columns based on need.
// here up to 3 columns can be displayed.
// copy paste repeated values to add
// more columns and headings.

const Table = ({ data }) => {
  // get keys from passed data
  // keys are used as headings of column
  const keys = Object.keys(data[0]);

  return (
    <>
      <div style={{ maxHeight: "30rem", overflowY: "auto" }}>
        <table className="table">
          {/* heading */}
          <thead>
            <tr>
              {keys[0] && (
                <th colSpan={2} scope="col">
                  {keys[0]}
                </th>
              )}
              {keys[1] && <th scope="col">{keys[1]}</th>}
              {keys[2] && <th scope="col">{keys[2]}</th>}
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {data?.map((values) => (
              <tr>
                {values[keys[0]] && (
                  <td colSpan="2">
                    <div className="topProd">
                      <div className="name">{values[keys[0]]}</div>
                      <div className="desc">
                        Lorem Ipsum is simply dummy text
                      </div>
                    </div>
                  </td>
                )}
                {values[keys[1]] && (
                  <td className="prodPrice">{values[keys[1]]}</td>
                )}
                {values[keys[2]] && (
                  <td className="prodPrice">{values[keys[2]]}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
