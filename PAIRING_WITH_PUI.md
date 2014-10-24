# Pairing with the Pivotal UI team

We find this session is most valuable when there's a goal, such as...

* Building a new page with Pivotal UI
* Converting an existing page to use Pivotal UI
* Any specific Pivotal UI-related question/problem/task
* Setting up Pivotal UI

## The best way to move a project over to pivotal UI

Instead of trying to convert an entire application all at once, we find that a page-by-page approach works best.

It is strongly encouraged to remove all existing styles on the page that you are trying to convert.
This way, you won't have to modify your existing CSS to co-exist with Pivotal UI, 
which will prevent any visual regressions on your other pages.

## Environment setup

1. Setup your project so that you have a page that is or can be stripped of all styles.
Here are some possible ways to accomplish this:
  - Setup a branch where you can comment out the current CSS and JS.
  - Setup a separate route/controller/view using only Pivotal UI CSS and JS includes.

1. Download the `dist.zip` file from the latest release on the
[Pivotal UI github page](https://github.com/pivotal-cf/pivotal-ui/releases/),
and add the CSS and JS files to the page you are working on.

1. If you are remote pairing, make sure you can remote-desktop to a machine in the New York labs office.
We can work with you to get this set up.
