import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TreeNode, Label, Asset, Datapoint } from "../model/Node.model";
import { mockTree } from "../data/mockTree";

type TreeState = {
  root: TreeNode;
};

const initialState: TreeState = {
    root: mockTree, 
  };

// Recursively map tree to apply transformation
const mapTree = (node: TreeNode, fn: (n: TreeNode) => TreeNode): TreeNode => {
  const updated = fn(node);
  return {
    ...updated,
    children: updated.children.map(child => mapTree(child, fn)),
  };
};

// Remove a node by ID and return updated tree
const removeNodeById = (node: TreeNode, nodeId: string): TreeNode => ({
  ...node,
  children: node.children
    .filter(child => child.id !== nodeId)
    .map(child => removeNodeById(child, nodeId)),
});

// Remove asset from the specified node
const removeAssetById = (node: TreeNode, nodeId: string, assetId: string): TreeNode => ({
  ...node,
  assets: node.id === nodeId
    ? node.assets.filter(asset => asset.id !== assetId)
    : node.assets,
  children: node.children.map(child => removeAssetById(child, nodeId, assetId)),
});

// Remove datapoint from an asset
const removeDatapoint = (node: TreeNode, assetId: string, datapointId: string): TreeNode => ({
  ...node,
  assets: node.assets.map(asset =>
    asset.id === assetId
      ? {
          ...asset,
          datapoints: asset.datapoints.filter(dp => dp.id !== datapointId),
        }
      : asset
  ),
  children: node.children.map(child =>
    removeDatapoint(child, assetId, datapointId)
  ),
});

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setTree(state, action: PayloadAction<TreeNode>) {
      state.root = action.payload;
    },

    updateNodeName(state, action: PayloadAction<{ nodeId: string; newName: string }>) {
      state.root = mapTree(state.root, node =>
        node.id === action.payload.nodeId
          ? { ...node, name: action.payload.newName }
          : node
      );
    },

    updateNodeLabels(state, action: PayloadAction<{ nodeId: string; labels: Label[] }>) {
      state.root = mapTree(state.root, node =>
        node.id === action.payload.nodeId
          ? { ...node, labels: action.payload.labels }
          : node
      );
    },

    addNode(state, action: PayloadAction<{ parentId: string; newNode: TreeNode }>) {
      console.log("➕ addNode:", action.payload);
      state.root = mapTree(state.root, node =>
        node.id === action.payload.parentId
          ? { ...node, children: [...node.children, action.payload.newNode] }
          : node
      );
    },

    deleteNode(state, action: PayloadAction<{ nodeId: string }>) {
      state.root = removeNodeById(state.root, action.payload.nodeId);
    },

    addAsset(state, action: PayloadAction<{ nodeId: string; asset: Asset }>) {
      state.root = mapTree(state.root, node =>
        node.id === action.payload.nodeId
          ? { ...node, assets: [...node.assets, action.payload.asset] }
          : node
      );
    },

    updateAssetName(state, action: PayloadAction<{ assetId: string; newName: string }>) {
      state.root = mapTree(state.root, node => ({
        ...node,
        assets: node.assets.map(asset =>
          asset.id === action.payload.assetId
            ? { ...asset, name: action.payload.newName }
            : asset
        ),
      }));
    },

    updateAssetLabels(state, action: PayloadAction<{ assetId: string; labels: Label[] }>) {
      state.root = mapTree(state.root, node => ({
        ...node,
        assets: node.assets.map(asset =>
          asset.id === action.payload.assetId
            ? { ...asset, labels: action.payload.labels }
            : asset
        ),
      }));
    },

    deleteAsset(state, action: PayloadAction<{ nodeId: string; assetId: string }>) {
      state.root = removeAssetById(state.root, action.payload.nodeId, action.payload.assetId);
    },

    addDatapoint(state, action: PayloadAction<{ assetId: string; datapoint: Datapoint }>) {
      state.root = mapTree(state.root, node => ({
        ...node,
        assets: node.assets.map(asset =>
          asset.id === action.payload.assetId
            ? {
                ...asset,
                datapoints: [...asset.datapoints, action.payload.datapoint],
              }
            : asset
        ),
      }));
    },

    updateDatapointLabels(state, action: PayloadAction<{ datapointId: string; labels: Label[] }>) {
      state.root = mapTree(state.root, node => ({
        ...node,
        assets: node.assets.map(asset => ({
          ...asset,
          datapoints: asset.datapoints.map(dp =>
            dp.id === action.payload.datapointId
              ? { ...dp, labels: action.payload.labels }
              : dp
          ),
        })),
      }));
    },

    deleteDatapoint(state, action: PayloadAction<{ assetId: string; datapointId: string }>) {
      state.root = removeDatapoint(state.root, action.payload.assetId, action.payload.datapointId);
    },
  },
});

export const {
  setTree,
  updateNodeName,
  updateNodeLabels: updateNodeLabel,
  addNode,
  deleteNode,
  addAsset,
  deleteAsset,
  updateAssetName,
  updateAssetLabels: updateAssetLabel,
  addDatapoint,
  updateDatapointLabels: updateDatapointLabel,
  deleteDatapoint,
} = treeSlice.actions;

export default treeSlice.reducer;
