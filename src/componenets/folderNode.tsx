"use client";

import { Node } from "../types/node";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { Box, Card, Flex, Text } from "@mantine/core";
import { useState } from "react";
import { TreeNode as TreeNodeType } from "../types/tree";
import { useTreeData } from "@/hooks/useTree";

export interface TreeNodeProps {
  node: TreeNodeType;
}

const TreeNode = ({ node }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-2">
      <Card
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
      >
        <Box>
          <Text>{`${node.firstName} ${node.lastName}`}</Text>
          <Text size="sm" color="gray.200">
            {node.role.name}
          </Text>
        </Box>
        {node.children.length > 0 && (
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        )}
      </Card>
      {isOpen && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

function TreeComponent() {
  const { data, isLoading, error } = useTreeData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}

export default TreeComponent;
