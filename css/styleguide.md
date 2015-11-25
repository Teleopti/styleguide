<div class="view-header">
<div class="view-title">
	<h1>Living Styleguide for Teleopti WFM</h1>
	<p>These guidelines are strongly inspired by http://www.google.com/design/spec/material-design/introduction.html
  which have been implemented in https://www.google.com/inbox/</p>

  <p>If something is missing, please refer to it.</p>
</div>
</div>

<h1>Main concepts</h1>
<ul class="wfm-simple-list">
<li><h2>Consistency</h2></li>
<li><h2>Less clicks</h2></li>
<li><h2>Scalability</h2></li>
<li><h2>Automate</h2>
	<div class="subtext">Do tasks behind the scenes.</div>
</li>
<li><h2>Help the user</h2>
  <div class="subtext">"Nature doesn't like empty space, and neither do users".
  Never provide an empty form but suggest things or display placeholders.</div>
</li>
<li><h2>Performance</h2>
<div class="subtext">No big bunches of data which doesn't fit on the screen. Consider aggregating data as an entry point. If it's not possible, then use pagination</div></li>
<li><h2>Responsiveness </h2></li>
</ul>

<h1>Other things to keep in mind</h1>
<ul class="wfm-simple-list">
<li>Reduce the number of actions displayed at the same time. Maybe some of them could be hidden until needed?
<div class="subtext">For example when a list is displayed : actions icons can be displayed only when an item is selected. See list section for an example.</div></li>
<li>If an action takes time (ajax request...) => display a loading bar (or a spinner). See loading bar section.</li>
<li>Tables, lists... etc should be sorted according to context (alphabetical order for example).</li>
<li>In general, providing ways to filter, sort and export to excel on tables, lists, grid is good.</li>
<li><h3>SignalR depends on JQuery, but do not use JQuery for other purposes. </b>(We want to phase it out eventually)</li>
</ul>

<h1>Help</h1>
Three levels of help must always be available through the whole application :
<ul class="wfm-simple-list">
<li>1. Tooltips : Add useful tooltips on elements providing *more* information (3/4 words max => "create a user" for an icon "+" for example).</li>
<li>2. Help panel : Display contextual informations(only 2 or 3 sentences) on the page or on a selected element and a link to the wiki.</li>
<li>3. Wiki page.</li>

<h1>Notifications</h1>
We provide notifications (see notifications section). It must be possible for the user to unsuscribe/resuscribe on each notification.
If the notification is about something in backgound, it's good to give a way to stop notifications. Whenever there is a risk that several notifications are created at once, make sure they are aggregated into a more manageable format.
