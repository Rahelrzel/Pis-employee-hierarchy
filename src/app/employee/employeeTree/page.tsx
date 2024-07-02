"use client";
import React, { useState } from "react";
import TreeComponent from "@/componenets/folderNode";
import { Button } from "@mantine/core";

function MainPage() {
  const [showTree, setShowTree] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowTree(!showTree)}>
        {showTree ? "Hide Tree" : "Show Tree"}
      </Button>
      {showTree && <TreeComponent />}
    </div>
  );
}

export default MainPage;
