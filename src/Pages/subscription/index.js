import React from "react";
import { subdata, subcolumns } from "../Tables/advanceTdata";
import DynamicTable from "../Tables/dynamicTable";
function Subscription() {
  return (
    <DynamicTable
      data={subdata}
      columns={subcolumns}
      title={"Subscription"}
      tableHeaderTitle={"Subscription"}
    />
  );
}

export default Subscription;
