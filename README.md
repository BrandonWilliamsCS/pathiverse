# Pathiverse

Pathiverse is a tool intended to facilitate consumption (and, if only indirectly, creation) of interactive story content. It's designed with flexibility and extensibility in mind — in hopes of supporting endless different options for content presentation as well as for for methods and consequences of interaction.

## Design Overview

In order to minimize limitations around content and interactions, Pathiverse has a design reminiscent of computer operating systems: a kernel that embodies the core concepts and acts as a foundation that is built upon by a collection of tools that provide a richer, more high-level interface for use. On top of that secondary system level, specialized plugins can be added for supporting particular behaviors. Additionally, in order to avoid any assumptions about the environment that hosts the software and operationalizes user i/o, the "platform" is split off as a separate concern.

There are a few fundamental and largely abstract concepts that are the building blocks of Pathiverse. Each Pathiverse experience occurs within the context of one _story_ that encompasses all possible interaction paths eminating from a starting point. Such paths navigate among a finite number of discrete, non-overlapping divisions of the story called _scenes_ — each with its own, dedicated piece of _content_. Scenes and content may be presented in the context of the path taken to reach that scene; the current scene, content, and contextual information generalize together to the concept of _state_. Readers drive state changes by triggering _actions_ through the interface.

### The Kernel

The Pathiverse kernel implements the very basics of what Pathiverse is designed to accomplish and leaves the rest to its consumers. Actually, the kernel is split into two layers: the _state kernel_, which implements the core mechanic as a reducer-based state machine, and a _story kernel_, which applies the semantics of story and scenes on top of that mechanism.

**The State Kernel** does its job by encapsulating a reducer and a starting state into a "capsule" that pairs a state and a function to change that state by applying an action. However, the entire capsule is immutable; calling the "action applier" function doesn't update the state, but instead produces a new capsule. Thus, at the very core of the design, Pathiverse supports functional behavior and the benefits that come with such purity (e.g., thread-safe data structures and the ability to "rewind" time by reverting to a past version). Developers can utilize this kernel by supplying custom reducers and starting states to it and by consuming the states and action appliers that come from it.

**The Story Kernel** builds upon the state kernel by enforcing story-related logic and structure to the state kernel's input and ouput. In particular, states that come from the story kernel will separate the operational, scene-specific meta state from a generic and configurable user state whose values (and the implications thereof) are the product of custom extentions to the Pathiverse software. The state kernel's requirement for a reducer and an initial state are translated into the need for a story, a user state reducer, and a reducer that may further transform story-aware state.

The full kernel — story upon state — leaves several broad approaches for customization: the structure of a scene can be expanded, actions may be intercepted and re-interpreted, user state and even the full story-aware state can be transformed based on custom actions, and of course the current state may be presened to the user in any number of ways. These customizations can occur in one of three domains: state (particularly its representation to the reader), reducers, and action application.

### State (and its representation)

State should contain any information necessary to express to the reader their current situation or to direct future actions. For example, it may contain the protagonist's location, posessions, and that they know the combination to the safe in the corner. Once given a state, it may be represented in whatever format is appropriate (e.g., text, a video clip, or a full-blown game map), and thus state representation provides the most significant and obvious point of customization of Pathiverse.

As far as the state kernel is concerned, state may be _anything_: objects, arrays, strings, numbers, functions, `undefined` — the sky is the limit. The places great power and responsibility on the developer, who must be able to represent the state in a user interface but can do so without restriction by the state kernel.

The story kernel, on the other hand, separates state into story state and "user state". While the story kernel may technically allow user state to vary as wildly as the state kernel does for state as a whole, there is a semantic expectation around what belongs in story state and not user state: the story state indicates the current scene and is expected to significantly impact representation to the reader whereas the user state should largely only tweak or adjust that representation. In a text adventure like _Zork_; the current location and user prompt (e.g., the description of the white house) is a matter of story state, and the game-generated record/consequences of past actions (e.g., picked up the nasty knife) are reflected in user state.

### Reducers

The reducer function encodes the decision-making logic of the game through generation of new states obtained by applying actions to a prior state. As such, the reducer provided to the kernel is the place to put _dynamic_ or _responsive_ customizations in place. Interpreting state in a specialized way is much more powerful when that state has a rich potential to change with each new action. 

A reducer, by nature, must be a pure function. A pathiverse reducer must accept a state and and action and return (a promise that resolves to) the result of the application of the given action to the given state. In particular, the given input state and action must not be modified by the reducer's computation, nor should any other program data, nor should the environment of the program (e.g., the filesystem). (For practical purposes, de-facto side-effects when reading data — such as file access timestamp changes — are not forbidden.) There are other extensibility points within Pathiverse that allow side-effects, but keep reducers pure! In essence: act as though the reducer may be called at any moment with any data, meaning there had better not be consequences elsewhere. But, because a reducer is a pure function, it's a great candidate for formulaic construction through traditional higher-order functions.

The state kernel requires a reducer that must be able to transform any state and any action that it might encounter; this is the cost of high abstraction/flexibility. Meanwhile, the story kernel enforces some structure by including scenes. In particular, it both expects state to be split into the current scene alongside arbitrary user state and additionally places some expectations on the type of the actions it receives (so that it may reduce the story side of its state). These expectations culminate such that the story kernel expects a _user state reducer_ rather than a full reducer so that it may produce a state kernel reducer that pairs scene reduction and user state reduction.

### Action Application

If a reducer produces state that is displayed to the user, the cycle completes with actions that prompt the reducer to produce new states. As such, the application of actions makes up the final area of customization. It is also the most powerful: state representation is unrestricted, but ultimately you must simply represent the state that is available; reducers that compute new states may produce whatever state they wish, but must be pure functions and hence only transform inputs to outputs. Action application, on the other hand, is free to manipulate both other facets and perform side-effects while doing so!

When working with either kernel, you are left with a capsule containing the current state and the a function to apply new actions. That *action applier* may be wrapped to powerful effect; by wrapping the provided applier before utilizing it in the UI, you can modify or skip incoming actions, manipulate the current state before passing it along to the consumer, or perform all manner of side effect (e.g, save progress, record user decision statistics, notify the user of "new" statuses).

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Use `npm start` to run the app in development mode - open [http://localhost:3000](http://localhost:3000) to view it in the browser. Use `npm test` to run unit tests with interactive watch mode.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
