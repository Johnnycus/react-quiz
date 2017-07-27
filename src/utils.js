import { findDOMNode } from 'react-dom';

export const isMounted = (component) => {
  try {
    findDOMNode(component);
    return true;
  } catch (e) {
    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
    return false;
  }
};
