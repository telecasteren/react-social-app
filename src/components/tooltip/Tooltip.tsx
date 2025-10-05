import React, { useState, useRef } from "react";
import DOMPurify from "dompurify";

interface TooltipProps {
  label?: string;
  content: string | string[];
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ label, content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef<HTMLDivElement>(null);

  const joinAndSanitizeContent = (): {
    actualContent: string;
    isMultiple: boolean;
  } => {
    let actualContent = "";
    let isMultiple = false;

    if (Array.isArray(content)) {
      if (content.length > 1) {
        actualContent = content.join(", ");
        isMultiple = true;
      } else if (content.length === 1) {
        actualContent = content[0];
      }
    } else {
      actualContent = content || "None";
    }

    return {
      actualContent: actualContent ? DOMPurify.sanitize(actualContent) : "",
      isMultiple,
    };
  };

  const updateTooltipPosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const showTooltip = () => {
    const { actualContent } = joinAndSanitizeContent();
    if (!actualContent) return;

    if (targetRef.current) {
      updateTooltipPosition(targetRef.current);
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const { actualContent, isMultiple } = joinAndSanitizeContent();

  if (!actualContent) return children;

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          className="absolute w-fit max-w-xs bg-gray-100 text-gray-800 p-2 rounded-md shadow-md text-sm transition-opacity duration-200 z-10 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: "translateX(-50%) translateY(-100%)",
          }}
        >
          <span className="font-medium">{label ? `${label}: ` : ""}</span>
          {isMultiple && <br />}
          <span dangerouslySetInnerHTML={{ __html: actualContent }} />
        </div>
      )}
    </>
  );
};
export default Tooltip;
