import { v4 as uuidv4 } from "uuid";
import type { Label, Datapoint, Asset, TreeNode } from "../model/Node.model";

export function createLabel(key: string, value: string): Label {
  return { key, value };
}

export function createDatapoint(name: string, type: 'number' | 'string' | 'boolean', labels: Label[] = []): Datapoint {
  return {
    id: uuidv4(),
    name,
    type,
    labels
  };
}

export function createAsset(name: string, type: string, labels: Label[] = [], datapoints: Datapoint[] = []): Asset {
  return {
    id: uuidv4(),
    name,
    type,
    labels,
    datapoints
  };
}

export function createTreeNode(
  name: string,
  type: TreeNode["type"] = "custom",
  labels: Label[] = [],
  assets: Asset[] = [],
  children: TreeNode[] = []
): TreeNode {
  return {
    id: uuidv4(),
    name,
    type,
    labels,
    assets,
    children
  };
}
