1. What causes the most re-renders in your solution and why?

Ans- The primary source of re-renders in this application is the search input, as it updates local state on user keystrokes. Without precautions, each keystroke would trigger a full re-render of the filtered user list.

To control this, the search value is debounced, and the filtered/sorted user list is wrapped in useMemo. This ensures that expensive list operations and re-renders only occur when the debounced search value or sorting criteria change, not on every key press. Additionally, individual list rows are memoized to prevent unnecessary child re-renders.






2. Which optimization did you intentionally avoid and why?

Ans- I intentionally avoided overusing useCallback and aggressive memoization across the entire component tree.

While memoization can improve performance in some cases, unnecessary use of useCallback often adds complexity, reduces readability, and provides little real-world benefit unless functions are passed to deeply memoized children. Instead, I applied memoization only where it clearly improves performance and keeps the codebase easier to reason about and maintain.






3. How would your solution behave with 100,000 users?

Ans- With 100,000 users, the current client-side filtering and sorting would still function correctly but would begin to show performance limitations, particularly during sorting and rendering large lists in the DOM.

To handle this scale efficiently, I would introduce:

List virtualization (e.g., react-window) to render only visible rows

Server-side pagination or filtering to reduce the amount of data processed on the client

Optional background prefetching using React Query to keep UX responsive

The existing architecture already supports these changes without major refactoring.






4. What would you refactor with one extra day of time?

Ans- With one additional day, I would focus on:

Adding list virtualization for better scalability

Improving accessibility (ARIA roles, keyboard navigation, focus management in the modal)

Introducing skeleton loaders instead of basic loading text

Adding unit tests for critical logic such as the debounce hook and list filtering

Slightly refining the UI using a lightweight design system or utility-first CSS for better consistency

These improvements would enhance performance, accessibility, and long-term maintainability without changing the core architecture.