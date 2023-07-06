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
            {headers.map((header: any, i: number) => {
              return <th key={i}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => {
            return (
              <tr key={item._id}>
                {headers.map((header: any, i: number) => {
                  return <td key={i}>{JSON.stringify(item[header])}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
