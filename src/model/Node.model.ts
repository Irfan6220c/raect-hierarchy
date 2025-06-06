export type Label = {
    key: string;
    value: string;
  };
  
  export type Datapoint = {
    id: string;
    name: string;
    type?: 'number' | 'string' | 'boolean'; 
    labels: Label[];
  };
  
  export type Asset = {
    id: string;
    name: string;
    type?: string; 
    labels: Label[];
    datapoints: Datapoint[];
  };
  
  export interface TreeNode {
    id: string;
    name: string;
    type?: 'organization' | 'country' | 'site' | 'hall' | 'line' | 'custom';
    labels: Label[];
    assets: Asset[];
    children: TreeNode[];
  }
  