

import React from "react";
import { subcolumns, subdata, } from "../Tables/advanceTdata";
import DynamicTable from "../Tables/dynamicTable";
function CanceledSubscription() {
  return (
    <DynamicTable
      data={subdata}
      columns={subcolumns}
      title={"CanceledSubscription"}
      tableHeaderTitle={"CanceledSubscription"}
    />
  );
}

export default CanceledSubscription;

