/*doc
 ---
 title: Tile Layout
 name: tile_layout_react
 categories:
 - react_utilities_tile-layout
 - react_all
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install pui-react-tile-layout pui-react-panels --save
 </i>
 </code>

 Require the subcomponents:

```
var TileLayout = require('pui-react-tile-layout').TileLayout;
var TileLayoutItem = require('pui-react-tile-layout').TileLayoutItem;

// for the example
var ClickableAltPanel = require('pui-react-panels').ClickableAltPanel;
```

 ```react_example
 <TileLayout columns={3}>
   <TileLayoutItem>
     <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
     <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayoutItem>
 </TileLayout>
 ```
*/

/*doc
 ---
 title: Responsive Breakpoints
 name: 01_tile_layout_responsive
 parent: tile_layout_react
 ---

 You can also pass an object setting the number of columns for responsive
 breakpoints to the columns prop. You can set separate column values
 (from 1 - 12 columns) for some or all of xs, sm, md, lg, and xl screen sizes.

 ```react_example
 <TileLayout columns={{xs: 1, sm: 2, md: 3}}>
   <TileLayoutItem>
     <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
     <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayoutItem>
 </TileLayout>
 ```

*/

/*doc
 ---
 title: Gutters
 name: 02_tile_layout_gutters
 parent: tile_layout_react
 ---

  You can make a TileLayout without gutters by passing noGutter as a prop.

 ```react_example
 <TileLayout noGutter columns={3}>
   <TileLayoutItem>
    <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
    <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayoutItem>
   <TileLayoutItem>
    <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayoutItem>
 </TileLayout>
 ```

 */
