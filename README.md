# spark-
A simple inline infographic web component great for displaying small
amounts of data when your not to concerned with precision.

## Adding
Firstly add as a submodule 
`git submodule add https://github.com/Skrywerbeer/sparkline`.
Then add to your markup.

```html
<script src="path/to/sparkline/sparkline.js"></script>
<spark-></spark->
```

## Attributes
`points` The list of values to use for drawing the sparkline
delimited by any non-numeric character.
```html
<spark- points="0.2 0.4 0.8"></spark->
```

## Styling
Styling is done using 
```css
spark- {}
spark::part(element) {}
spark-::part(even) {}
spark-::part(odd) {}
spark-::part(first) {}
spark-::part(last) {}
```
and the svg presentation attributes such as `fill` and `stroke-width`.
Note when using `::part(even/odd)` and `::part(first/last)`
the latter needs to come after the former in the stylesheet, as they
both have the same specificity.
