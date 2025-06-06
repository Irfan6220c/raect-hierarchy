import React from "react";

type PathViewerProps = {
  path: string[] | null;
  inheritedLabels: { key: string; value: string }[];
};

const PathViewer: React.FC<PathViewerProps> = ({ path, inheritedLabels }) => {
  return (
    <div style={{ marginTop: 10, fontSize: "0.9em" }}>
      {path && (
        <div>
           <strong>Full Path:</strong> {path.join(" > ")}
        </div>
      )}
      {inheritedLabels.length > 0 && (
        <div>
          🏷️ <strong>Inherited Labels:</strong>
          <ul>
            {inheritedLabels.map((label, i) => (
              <li key={i}>
                {label.key}: {label.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PathViewer;
