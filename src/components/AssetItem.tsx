import React, { useState } from "react";
import { useAppDispatch } from "../store/hook";
import {
  updateAssetName,
  deleteAsset,
  updateAssetLabel,
  addDatapoint,
  deleteDatapoint,
  updateDatapointLabel,
} from "../store/treeSlice";
import LabelEditor from "./LabelEditor";
import { findPathToTarget, collectInheritedLabels } from "../utils/treeUtils";
import type { Asset, TreeNode } from "../model/Node.model";

type Props = {
  asset: Asset;
  nodeId: string;
  root: TreeNode;
};

const AssetItem: React.FC<Props> = ({ asset, nodeId, root }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(asset.name);
  const [showPath, setShowPath] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showAddDatapoint, setShowAddDatapoint] = useState(false);
  const [dpName, setDpName] = useState("");
  const [dpType, setDpType] = useState<"number" | "string" | "boolean">("number");

  const path = findPathToTarget(root, asset.id, "asset");
  const inheritedLabels = collectInheritedLabels(root, asset.id, "asset");

  const handleAddDatapoint = () => {
    if (!dpName.trim()) return;
    dispatch(
      addDatapoint({
        assetId: asset.id,
        datapoint: {
          id: crypto.randomUUID(),
          name: dpName.trim(),
          type: dpType,
          labels: [],
        },
      })
    );
    setDpName("");
    setDpType("number");
    setShowAddDatapoint(false);
  };

  return (
    <li style={{ marginLeft: 16 }}>
      {editing ? (
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => {
            dispatch(updateAssetName({ assetId: asset.id, newName: input.trim() }));
            setEditing(false);
          }}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>
          <strong>{asset.name}</strong> ({asset.type})
        </span>
      )}

      <button
        onClick={() => dispatch(deleteAsset({ nodeId, assetId: asset.id }))}
        style={{ marginLeft: 8 }}
      >
        Delete Asset
      </button>

      <button onClick={() => setShowAddDatapoint(p => !p)} style={{ marginLeft: 6 }}>
        Add Datapoint
      </button>

      <button onClick={() => setShowPath(p => !p)} style={{ marginLeft: 6 }}>
        {showPath ? " Hide Path" : " Show Path"}
      </button>

      <button onClick={() => setShowLabels(p => !p)} style={{ marginLeft: 6 }}>
        {showLabels ? "Hide Inherited Labels" : "Show Inherited Labels"}
      </button>

      <LabelEditor
        labels={asset.labels}
        onChange={(labels) => dispatch(updateAssetLabel({ assetId: asset.id, labels }))}
      />

      {showPath && path && (
        <div style={{ fontSize: "0.85em" }}>Path: {path.join(" > ")}</div>
      )}

      {showLabels && (
        <div style={{ fontSize: "0.85em" }}>
          <strong>Inherited Labels:</strong>
          <ul>
            {inheritedLabels.map((l, i) => (
              <li key={i}>
                {l.key}: {l.value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul>
        {asset.datapoints.map((dp) => (
          <li key={dp.id} style={{ marginLeft: 16 }}>
            📊 {dp.name} <span style={{ color: "gray" }}>({dp.type})</span>
            <button
              onClick={() =>
                dispatch(deleteDatapoint({ assetId: asset.id, datapointId: dp.id }))
              }
              style={{ marginLeft: 8 }}
            >
              Delete Datapoint
            </button>

            <LabelEditor
              labels={dp.labels}
              onChange={(labels) =>
                dispatch(updateDatapointLabel({ datapointId: dp.id, labels }))
              }
            />
          </li>
        ))}

        {showAddDatapoint && (
          <li style={{ marginLeft: 16, marginTop: 8 }}>
            <input
              placeholder="Datapoint name"
              value={dpName}
              onChange={(e) => setDpName(e.target.value)}
              style={{ marginRight: 4 }}
            />
            <select
              value={dpType}
              onChange={(e) => setDpType(e.target.value as any)}
              style={{ marginRight: 4 }}
            >
              <option value="number">Number</option>
              <option value="string">String</option>
              <option value="boolean">Boolean</option>
            </select>
            <button onClick={handleAddDatapoint}>Create</button>
          </li>
        )}
      </ul>
    </li>
  );
};

export default AssetItem;
