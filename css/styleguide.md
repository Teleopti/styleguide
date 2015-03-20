Living Styleguide for Teleopti WFM
=================

These guidelines are strongly inspired by http://www.google.com/design/spec/material-design/introduction.html
which have been implemented in https://www.google.com/drive/

If something is missing, please refer to it.


Main concepts
---

1. Maintain consistency.
2. Avoid unnecessary clicks.
3. Automate tasks in background. 
4. "Nature doesn't like empty space, and neither do users". 
6. From the previous rule : Never provide an empty form but suggest things or display placeholders.
7. Learn from users habits.
8. Adapt to scale.
9. Be aware of performance. Don't display a big bunch of data which doesn't fit in the screen. Consider aggregating data as an entry point. If it's not possible, then use infinite scrolling or pagination
10. Be responsive


Other things to keep in mind
---

1. Reduce the number of actions displayed at the same time. Maybe some of them could be hidden until needed?
For example when a list is displayed : actions icons can be displayed only when an item is selected. See list section for an example.
2. If an action takes time (ajax request...) => display a loading bar (or a spinner). See loading bar section.
3. Tables, lists... etc should be sorted according to context (alphabetical order for example).
4. Giving visual identity to objects (by icons and colors for example).
5. In general, providing ways to filter, sort and export to excel on tables, lists, grid is good.
6. Actions history must be available.
7. If possible, provide undo/redo feature.
8. Keyboard shortcuts must be available.
9. Use nice material design animation to move from a state to another one or to display actions: http://www.google.com/design/spec/animation/meaningful-transitions.html

Help
---

Three levels of help must be always available through the whole application :
1. Tooltips : Add useful tooltips on elements providing *more* information (3/4 words max => "create a user" for an icon "+" for example).
2. Help panel : (currently bottom of the right panel) Display contextual informations(only 2 or 3 sentences) on the page or on a selected element and a link to the wiki.
3. Wiki page.

Notifications 
---

At the top of the right panel, we provide notifications. It must be possible for the user to unsuscribe/resuscribe on each notification.
If the notification is about something in backgound, it's good to give a way to stop notifications. Whenever there is a risk that several notifications are created at once, make sure they are aggregated into more manageable alerts.

