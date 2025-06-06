import React, { useState } from "react";
import TreeNodeItem from "./TreeNodeItem";
import { useSelector } from "react-redux";
import type { TreeNode } from "../model/Node.model";
import type { RootState } from "../store";

// Utility function to clone and modify the tree
const findNodeById = (node: TreeNode, id: string): TreeNode | null => {
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
};

const removeNodeById = (node: TreeNode, id: string): [TreeNode, TreeNode | null] => {
  const newNode: TreeNode = {
    ...node,
    children: [],
  };
  let removed: TreeNode | null = null;

  for (const child of node.children) {
    if (child.id === id) {
      removed = child;
    } else {
      const [updatedChild, found] = removeNodeById(child, id);
      newNode.children.push(updatedChild);
      if (found) removed = found;
    }
  }

  return [newNode, removed];
};

const TreeView: React.FC = () => {
  const treeData = useSelector((state: RootState) => state.tree.root);
  const [searchTerm, setSearchTerm] = useState("");


  const filterTree = (node: TreeNode, term: string): TreeNode | null => {
    const lowerTerm = term.toLowerCase();
    const nameMatch = node.name.toLowerCase().includes(lowerTerm);
    const labelMatch = node.labels.some(label =>
      label.key.toLowerCase().includes(lowerTerm) ||
      label.value.toLowerCase().includes(lowerTerm)
    );
    const assetMatch = node.assets.some(asset =>
      asset.name.toLowerCase().includes(lowerTerm) ||
      asset.labels.some(label =>
        label.key.toLowerCase().includes(lowerTerm) ||
        label.value.toLowerCase().includes(lowerTerm)
      )
    );

    const filteredChildren = node.children
      .map(child => filterTree(child, lowerTerm))
      .filter(Boolean) as TreeNode[];

    if (nameMatch || labelMatch || assetMatch || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
        assets: node.assets.filter(asset =>
          asset.name.toLowerCase().includes(lowerTerm) ||
          asset.labels.some(label =>
            label.key.toLowerCase().includes(lowerTerm) ||
            label.value.toLowerCase().includes(lowerTerm)
          )
        )
      };
    }

    return null;
  };

  const filteredTree = searchTerm.trim()
    ? filterTree(treeData, searchTerm)
    : treeData;

  return (
    <>
      <input
        placeholder="Search nodes/assets/labels..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 8, width: "100%", padding: 6 }}
      />
        <ul>
          {filteredTree && (
            <TreeNodeItem
              node={filteredTree}
              level={0}
              root={treeData}
            />
          )}
        </ul>
    </>
  );
};

export default TreeView;
