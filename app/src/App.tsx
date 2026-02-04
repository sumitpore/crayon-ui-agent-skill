import React from 'react';
import { useFileWatcher } from './hooks/useFileWatcher';
import { componentRegistry } from './componentRegistry';
import { Callout } from '@crayonai/react-ui';
import './styles/brand.css';

interface ComponentDefinition {
  component: string;
  props?: Record<string, unknown>;
}

// Recursively render components from JSON definition
// isNested = true means this is a child of another component (don't wrap in div)
function renderComponent(definition: ComponentDefinition, index: number, isNested: boolean = false): React.ReactNode {
  const { component, props = {} } = definition;

  const Component = componentRegistry[component];
  if (!Component) {
    return (
      <Callout key={index} type="warning" title="Unknown Component">
        Component "{component}" not found in registry
      </Callout>
    );
  }

  // Process children prop - it might be an array of component definitions
  const processedProps = { ...props };
  if (Array.isArray(props.children)) {
    processedProps.children = (props.children as ComponentDefinition[]).map((child, i) => {
      if (typeof child === 'object' && child !== null && 'component' in child) {
        // Nested children - don't wrap them in div
        return renderComponent(child as ComponentDefinition, i, true);
      }
      return child;
    });
  }

  // Only wrap top-level components in the styling div
  if (isNested) {
    return <Component key={index} {...processedProps} />;
  }

  return (
    <div key={index} className="crayon-component">
      <Component {...processedProps} />
    </div>
  );
}

function App() {
  const { response, error } = useFileWatcher();

  return (
    <div className="crayon-app">
      {/* Gradient top bar is added via CSS */}
      <div className="crayon-content">
        {/* Header */}
        <header className="crayon-header">
          <h1>Crayon UI Renderer</h1>
          <div className="crayon-status">
            <span>Live</span>
          </div>
        </header>

        {/* Error display */}
        {error && (
          <div className="crayon-error">
            <Callout type="error" title="Error">
              {error}
            </Callout>
          </div>
        )}

        {/* Render components from response */}
        <div className="crayon-components">
          {response?.components?.map((def, index) => renderComponent(def, index))}
        </div>

        {/* Empty state */}
        {!response && !error && (
          <div className="crayon-empty-state">
            <p>No response yet</p>
            <p>
              Write JSON to <code>~/.crayon/response.json</code> to see it rendered here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
