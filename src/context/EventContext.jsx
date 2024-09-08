import { createContext, useContext, useReducer } from 'react';

// Create a new context for the event
const EventContext = createContext();

// Create a display name for the context
EventContext.displayName = 'EventContext';

// Create a reducer function to handle the state
const eventReducer = (state, action) => {
  switch (action.type) {
    case 'add-Event': {
      const newEvent = {
        id: state[state.length - 1].id + 1,
        title: action.title,
        description: action.description,
      };
      return state.concat(newEvent);
    }
    case 'remove-Event':
      return state.filter((event) => event.id !== action.id);
    default:
      return state;
  }
};

// Create a provider component for the event context
export const EventContextProvider = ({ children }) => {
  // Use the eventReducer to manage the state of events
  const [events, dispatch] = useReducer(eventReducer, {
    events: [],
  });

  // Define actions to interact with the event state
  const addEvent = (props) => {
    dispatch({ type: 'add-Event', ...props });
  };

  const removeEvent = (event) => {
    dispatch({
      type: 'remove-Event',
      event,
    });
  };

  // Combine the actions into a single object
  const actions = {
    addEvent,
    removeEvent,
  };

  // Provide the event context and actions to the children components
  return (
    <EventContext.Provider value={{ events, actions }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to access the event context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error(
      'useEventContext must be used within an EventContextProvider'
    );
  }
  return context;
};
