# vue-punk-api

Created based on challenge mockup from [Dynamit](https://github.com/Dynamit/front-end-code-day/tree/master/punk-api)


# Features

1. Clicking button loads beers into responsive elements.
2. Loading is indicated by a transition done on the beer elements, and by a basic spinner (its too fast for me to see, but would be useful for individuals on mobile networks).
3. After fetching beer info, dropdown selector allows sorting by ABV and first brew date.
4. After fetching beer info, clicking thumbnails displays that beer's image as a larger modal.

~Instead of implementing a toggleable column system (switch between 4 and 2) I opted to make all elements the same size and wrap based on screen size.~
5. Actually after learning more about CSS Grid I implemented a dropdown selector that could toggle to 2 columns, but still made the columns responsively collapse as they were before through grid.



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
