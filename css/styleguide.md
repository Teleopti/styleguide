<div class="view-header">
<div class="view-title">
	<h3><img src="http://www.teleopti.com/system/images/teleopti_logo.png" alt="Teleopti logo" height="30px" style="vertical-align:bottom;">
   Living Styleguide for Teleopti WFM</h3>
	<p>These guidelines are strongly inspired by http://www.google.com/design/spec/material-design/introduction.html
  which have been implemented in https://www.google.com/inbox/</p>

  <p>If something is missing, please refer to it.</p>
</div>
</div>

<h4>Main concepts</h4>
<ul class="wfm-simple-list">
<li><b>Consistency</b></li>
<li><b>Less clicks</b></li>
<li><b>Scalability</b></li>
<li><b>Automate</b> tasks in the background.</li>
<li><b>Help the user</b>
  <div class="subtext">"Nature doesn't like empty space, and neither do users".
  Never provide an empty form but suggest things or display placeholders.</div></li>
<li><b>Performance </b>
<div class="subtext">no big bunch of data which doesn't fit in the screen. Consider aggregating data as an entry point. If it's not possible, then use pagination</div></li>
<li><b>Responsiveness </b></li>
</ul>

<h4>Other things to keep in mind</h4>
<ul class="wfm-simple-list">
<li>Reduce the number of actions displayed at the same time. Maybe some of them could be hidden until needed?
<div class="subtext">For example when a list is displayed : actions icons can be displayed only when an item is selected. See list section for an example.</div></li>
<li>If an action takes time (ajax request...) => display a loading bar (or a spinner). See loading bar section.</li>
<li>Tables, lists... etc should be sorted according to context (alphabetical order for example).</li>
<li>In general, providing ways to filter, sort and export to excel on tables, lists, grid is good.</li>
<li><b>SignalR depends on JQuery, but do not use JQuery for other purposes. </b>(We want to phase it out eventually)</li>
</ul>

<h4>Help</h4>
Three levels of help must always be available through the whole application :
<ul class="wfm-simple-list">
<li>1. Tooltips : Add useful tooltips on elements providing *more* information (3/4 words max => "create a user" for an icon "+" for example).</li>
<li>2. Help panel : Display contextual informations(only 2 or 3 sentences) on the page or on a selected element and a link to the wiki.</li>
<li>3. Wiki page.</li>

<h4>Notifications</h4>
We provide notifications (cf notifications section). It must be possible for the user to unsuscribe/resuscribe on each notification.
If the notification is about something in backgound, it's good to give a way to stop notifications. Whenever there is a risk that several notifications are created at once, make sure they are aggregated into a more manageable format.
