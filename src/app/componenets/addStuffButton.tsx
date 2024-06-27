import React from "react";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface AddStuffButtonProps {
  onClick: () => void;
}

const AddStuffButton = ({ onClick }: AddStuffButtonProps) => {
  return (
    <Button color="green" onClick={onClick}>
      Add Stuff
    </Button>
  );
};

export default AddStuffButton;
