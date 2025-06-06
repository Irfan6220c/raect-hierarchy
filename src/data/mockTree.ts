import {
    createTreeNode,
    createAsset,
    createDatapoint,
    createLabel
  } from "../factories/treeFactory";
import type { TreeNode } from "../model/Node.model";
  
  export const mockTree: TreeNode = createTreeNode(
    "Cybus",
    "organization",
    [createLabel("Project", "CybusPowerCell")],
    [],
    [
      createTreeNode("Germany", "country", [], [], [
        createTreeNode("Hamburg", "site", [createLabel("Region", "North")], [], [
          createTreeNode("Hall A", "hall", [], [], [
            createTreeNode("Line 1", "line", [], [
              createAsset("DEHHWelding_03", "IS-Q6000A", [
                createLabel("AssetType", "Welding"),
                createLabel("Status", "Active")
              ], [
                createDatapoint("current", "number", [createLabel("Unit", "Amps")]),
                createDatapoint("pressure", "number", [createLabel("Unit", "Bar")]),
                createDatapoint("state", "string", [])
              ]),
              createAsset("DEHHWelding_04", "IS-Q6000B", [
                createLabel("AssetType", "Welding")
              ])
            ], [
              createTreeNode("AOI", "custom", [], [
                createAsset("DEHHCam_1", "Camera", [
                  createLabel("Resolution", "1080p")
                ])
              ])
            ])
          ])
        ]),
        createTreeNode("Berlin", "site", [createLabel("Region", "East")], [], [
          createTreeNode("Line 1", "line", [], [
            createAsset("DEBWelding_03", "IS-Q7000", [
              createLabel("AssetType", "Welding")
            ])
          ]),
          createTreeNode("CMS", "custom", [
            createLabel("Role", "Central Management System")
          ])
        ])
      ]),
      createTreeNode("USA", "country", [], [], [
        createTreeNode("San Francisco", "site", [createLabel("Region", "West Coast")], [], [
          createTreeNode("Assembly Line", "line", [], [
            createAsset("USSFAssembler_01", "AssemblerX", [
              createLabel("Manufacturer", "AssemCo")
            ], [
              createDatapoint("temperature", "number"),
              createDatapoint("vibration", "number")
            ])
          ])
        ])
      ])
    ]
  );
  