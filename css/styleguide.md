<div class="view-header">
<div class="view-title">
<h1>Living Styleguide for Teleopti WFM</h1>
<p>These guidelines are strongly inspired by <a href="http://www.google.com/design/spec/material-design/introduction.html">Material design</a>
which have been implemented in <a href="https://www.google.com/inbox/">Google inbox</a> and <a href="http://www.materialup.com/">Android</a> </p>

<p>If something is missing, please refer to it.</p>
</div>
</div>

<h1>Main concepts</h1>
<ul class="wfm-simple-list">
<li><h2>Consistency</h2>
<div class="subtext">By making the users recognize elements and behaviors we make the product faster to use.</div>
</li>
<li><h2>Less clicks</h2>
<div class="subtext">Keep the number of clicks in mind when building a view. </div>
</li>
<li><h2>Scalability</h2>
<div class="subtext">Conceder how things works with any number of data items, from S to XL</div>
</li>
<li><h2>Help the user</h2>
<div class="subtext">"Nature doesn't like empty space, and neither do users".
Never provide an empty form but suggest things or display placeholders.</div>
</li>
<li><h2>Performance</h2>
<div class="subtext">Avoid big bunches of data which doesn't fit on the screen. Consider aggregating data as an entry point.</div></li>
<li><h2>Responsiveness</h2>
<div class="subtext">Using the containers and elements from this Styleguide should result in a layout that works on desktops, tablets and phones.</div>
</li>
</ul>

<h1>Other things to keep in mind</h1>
<ul class="wfm-simple-list">
<li>
<h2>Number of actions</h2>
<div class="subtext">Reduce the number of actions displayed at the same time. Maybe some of them could be hidden until needed? For example, split similar actions in a context menu into several menus so a user don't get overwhelmed</div></li>
<li><h2>Loading</h2>
<div class="subtext">If something takes time, dont leave the users in the dark. Display a loading bar, a spinner or a message.</li></li>
<li><h2>Sorting and filters</h2>
<div class="subtext">Provide ways to filter and sort large amounts of data, such as lists and tables.</div></li>
<li><h3>SignalR depends on JQuery, but do not use JQuery for other purposes. </b>(We want to phase it out eventually)</li>
</ul>

<h1>Help</h1>
Two levels of help are available through the whole application:
<ul class="wfm-simple-list">
<li>
<h2> Tooltips</h2>
<div class="subtext">Add useful tooltips on elements providing *more* information (3/4 words max => "create a user" for an icon "+" for example).</div>
</li>
<li>
<h2>Wiki page</h2>
<div class="subtext">The wiki page for each module can be accessed from the top right corner</div>
</li>


<h1>Notices and Notifications</h1>
Notices and notifications are ways to inform the users what we are doing.
Notices are temporary alerts that should quickly show up and disappear when appropriate.
Notifications are more permanent and remind the users what happened recently.  

It must be possible for the user to unsuscribe/resuscribe on each notification because if there is a risk that several notifications are created at once, make sure they are aggregated into a more manageable format.
