# HTML + JS Interview Prep

I am preparing for a one-hour technical interview focused on debugging an existing vanilla HTML + JavaScript codebase.

I am relatively new to JavaScript. I do NOT want to practice React, Node, Express, TypeScript, or any other framework. Use only basic HTML, CSS if needed, and browser-side JavaScript.

Please create a small debugging exercise for me.

The project should:

* Be a small but realistic interactive webpage.
* Contain approximately 2–4 files, such as `index.html`, `script.js`, and optionally `style.css`.
* Use basic JavaScript concepts that are realistic for this interview:
  * DOM selection
  * event listeners
  * reading values from inputs
  * arrays and objects
  * functions
  * conditionals and loops
  * updating the DOM
* Be understandable without knowledge of any external library or framework.
* Take approximately 20–30 minutes for a beginner JavaScript developer to debug.
* Contain 2–3 bugs.
* Start relatively easy. The bugs should be realistic mistakes rather than obscure JavaScript trivia.

Examples of appropriate bugs include:

* selecting the wrong DOM element
* an event listener attached incorrectly
* reading `.value` from the wrong place
* comparing the wrong values
* incorrect array manipulation
* accidentally using a string where a number is expected
* updating the wrong DOM element
* a function receiving the wrong argument
* an off-by-one or simple logic error

Please make the bugs independent enough that I can discover them while tracing the application.

IMPORTANT:

1. Do not tell me where the bugs are.
2. Do not label suspicious lines.
3. Do not give me hints initially.
4. Do not give me the solution.
5. Do not include comments that reveal the bugs.

Instead:

1. Give me a short description of what the application is supposed to do.
2. Give me the complete file structure and contents of every file.
3. Tell me how to run it locally in a browser.
4. Give me a short list of expected behaviors I can manually test.
5. Then stop and let me debug it.

During the exercise, act like an interviewer rather than immediately fixing things for me.

When I show you my reasoning or code:

* Tell me whether my reasoning is heading in the right direction.
* Point out misunderstandings about JavaScript or the browser.
* Prefer small hints over giving me the answer.
* If I explicitly ask for the solution, then explain the bug and fix.
* Pay attention to how I navigate the codebase and trace data/event flow.

Choose a small, self-contained application such as a task list, shopping list, score tracker, simple form, filterable list, or another similar interactive webpage.

Keep the scope appropriate for the requested difficulty level (easy, medium, interview-level), and vary the application and bugs each time I reuse this prompt so that I am not practicing the same patterns repeatedly.