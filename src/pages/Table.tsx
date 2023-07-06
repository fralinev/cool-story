import { useEffect, useState } from "react";

const Table = ({ data }: any) => {
  const [headers, setHeaders] = useState<any>([]);
  useEffect(() => {
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
    }
  }, [data]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.length > 0
              ? headers.map((header: any, i: number) => {
                  return <th key={i}>{header}</th>;
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((item: any) => {
                return (
                  <tr key={item._id}>
                    {headers.length > 0
                      ? headers.map((header: any, i: number) => {
                          return (
                            <td key={i}>{JSON.stringify(item[header])}</td>
                          );
                        })
                      : null}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
};
export default Table;
