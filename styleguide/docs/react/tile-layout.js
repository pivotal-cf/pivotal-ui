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

 Require the component:

 ```
var TileLayout = require('pui-react-tile-layout');
var ClickableAltPanel = require('pui-react-panels').ClickableAltPanel;
 ```

 For the example, you also need to require `ClickableAltPanel` from [Panels](/react_components_panels.html).


 ```react_example
 <TileLayout columns={3}>
   <TileLayout.Item>
     <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
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
   <TileLayout.Item>
     <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
     <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
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
   <TileLayout.Item>
    <ClickableAltPanel>Hey</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
    <ClickableAltPanel>What</ClickableAltPanel>
   </TileLayout.Item>
   <TileLayout.Item>
    <ClickableAltPanel>Hello</ClickableAltPanel>
   </TileLayout.Item>
 </TileLayout>
 ```

 */
