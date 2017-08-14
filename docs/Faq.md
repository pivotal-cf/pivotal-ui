# FAQ

## What browsers are supported?

On the desktop, Pivotal UI supports recent versions of Chrome, Firefox, Edge, and Safari as well as IE10+. Pivotal UI does sometimes use flexbox, which does not work on IE9.
Pivotal UI also supports recent versions of mobile Chrome and Safari.

## How do I customize my components?

You should use modifier classes to change the spacing between a component and its siblings, or a component and its
 children. Modifier classes can also be used to change simple attributes such as background color or text color. But, if
 you start making more in-depth modifications, this is the time to subclass your component. For example: 'simple',
 'basic', and 'shadow' are all types of panels. They do more than just change colors or spacing, so it makes sense to
 make them a separate component. It also makes them easier to work with, because you can achieve the new look and feel
 by just adding one class name to the outer wrapper.
Caveat: Using lots of modifier classes is really tempting because you don't have to write your own CSS, but it can
 quickly get messy as someone attempting to reuse the component would need to get all the classes right on the
 different dom nodes in order to match your style. It also means that there is no longer a way to globally change the
 styles, as there isn't a class name 'hook' into that component.
TLDR; Use modifier classes only for simple overrides. For anything more complicated, make a sub-component.

## Using modifier classes

```jsx
::title=Base Panel
<Panel title="Base Panel" id="myBasePanel">
  <p>Base contents</p>
</Panel>
```

```jsx
::title=Panel with modifier classes
<Panel title="Panel with modifier classes" className="paxxl bg-brand-11" innerClassName="type-neutral-11 bg-brand-10">
  <p>Panel contents</p>
</Panel>
```

```jsx
::title=Passing custom styles to a component?
::description=This is not recommended. We suggest customizing your component using modifier or custom classes.
<Panel title="Base Panel" style={{fontFamily: 'fantasy', textTransform: 'uppercase'}}>
  <p>Base contents</p>
</Panel>
```
*/