import React, { useState } from "react";
import { useAppDispatch } from "../store/hook";
import {
  updateNodeName,
  addNode,
  deleteNode,
  addAsset,
  updateNodeLabel,
} from "../store/treeSlice";
import { createTreeNode, createAsset } from "../factories/treeFactory";
import LabelEditor from "./LabelEditor";
import type { TreeNode } from "../model/Node.model";
import AddAssetForm from "./AddAssetForm";
import AddNodeForm from "./AddNodeForm";
import AssetItem from "./AssetItem";

type Props = {
  node: TreeNode;
  level: number;
  root: TreeNode;
};

const TreeNodeItem: React.FC<Props> = ({ node, level, root }) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(true);
  const [editingNode, setEditingNode] = useState(false);
  const [nodeInput, setNodeInput] = useState(node.name);
  const [showAddNodeForm, setShowAddNodeForm] = useState(false);
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);
  const [showLabelEditor, setShowLabelEditor] = useState(false);

  const handleNameSave = () => {
    dispatch(updateNodeName({ nodeId: node.id, newName: nodeInput.trim() }));
    setEditingNode(false);
  };

  return (
    <li style={{ marginLeft: level * 16 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => setExpanded(p => !p)} style={{ marginRight: 8 }}>
          {expanded ? "−" : "+"}
        </button>

        {editingNode ? (
          <input
            value={nodeInput}
            onChange={e => setNodeInput(e.target.value)}
            onBlur={handleNameSave}
            autoFocus
          />
        ) : (
          <strong onDoubleClick={() => setEditingNode(true)}>{node.name}</strong>
        )}

        <span style={{ marginLeft: 8, color: "gray" }}>({node.type})</span>

        {level > 0 && (
          <button onClick={() => dispatch(deleteNode({ nodeId: node.id }))} style={{ marginLeft: 10 }}>
             Delete
          </button>
        )}

        <button onClick={() => setShowAddNodeForm(p => !p)} style={{ marginLeft: 10 }}>
          Add Node
        </button>

        <button onClick={() => setShowAddAssetForm(p => !p)} style={{ marginLeft: 6 }}>
           Add Asset
        </button>

        <button onClick={() => setShowLabelEditor(p => !p)} style={{ marginLeft: 6 }}>
          Labels
        </button>
      </div>

      {showLabelEditor && (
        <LabelEditor
          labels={node.labels}
          onChange={(labels) => dispatch(updateNodeLabel({ nodeId: node.id, labels }))}
        />
      )}

      {showAddNodeForm && (
        <AddNodeForm
          onSubmit={(name, type) => {
            dispatch(addNode({ parentId: node.id, newNode: createTreeNode(name, type as any) }));
            setShowAddNodeForm(false);
          }}
        />
      )}

      {showAddAssetForm && (
        <AddAssetForm
          onSubmit={(name, type) => {
            dispatch(addAsset({ nodeId: node.id, asset: createAsset(name, type) }));
            setShowAddAssetForm(false);
          }}
        />
      )}

      {expanded && (
        <ul>
          {node.assets.map(asset => (
            <AssetItem key={asset.id} asset={asset} nodeId={node.id} root={root} />
          ))}
          {node.children.map(child => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} root={root} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNodeItem;
