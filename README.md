# grapheditor
# Sequence
### Libraries used :
1. jqurey <br>

    using this library we implement event listeners to our html elements.
    
    ```html
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
    ```

2. snapsvg.js <br>
    snapsvg.js is a javascript library to draw svg elements to webpages. It 
    is located in lib folder.

    ```bash
    grapheditor
        |-->lib
            |-->snap.svg-min.js
    ```
    http://snapsvg.io

    we will use this library to draw our drawings.
    ```html
    <script src="lib/snap.svg-min.js"></script>
    ```

### Other javascript files:

1.  main.js

    here we will have our system logic.
    ```bash
    grapheditor
        |-->js
            |-->main.js
    ```

### Logic till now

1. our main.js file has _onload()_ function (https://www.w3schools.com/jsref/event_onload.asp) <br>
which is called by the browser when our whole document is loaded!.<br>

    where we have firstly initialized snapsvg object.
    ```javascript
    var s = Snap("#svg");
    ```
    we will use __s__ object to draw elements to html. And __#svg__ is the<br>elemnt where we will draw the shapes.

    ```html
    <svg id='svg' class='img-responsive' viewBox="0 0 1200 700">

    </svg>
    ```


2. In index.html file we have four buttons:
```html
    <button id="addEntityBtn"> Add Enity</button>
    <button id="addProcessBtn"> Add Process</button>
    <button id="addDataStoreBtn"> Add Data Store</button>
    <button id="addArrowBtn"> Add Arrow</button>
```
* when the buttons are clicked, click event are raised ,which are captured by jqurey functions using their ids.

```javascript
    // This function is called when add entity is clicked
    $("#addEntityBtn").click(function() {
        
    });

    // This function is called when add process is clicked
    $("#addProcessBtn").click(function() {
        
    });

    // This function is called when add data store is clicked
    $("#addDataStoreBtn").click(function() {
        
    });

    // This function is called when add arrow is clicked
    $("#addArrowBtn").click(function() {
        
    });

```

3. Each of this function calls another function _createEntity(label)_ to create a svg element.

    ```javascript
    $("#addEntityBtn").click(function() {
        let entity1 = createEntity("1st")
        entity1.drag(move, start, stop);
    });

    // Create Entity Diagram
    function createEntity(label) {
        let entity = s.rect(100, 100, 100, 100),
            entitylable = s.text(100+20,100+50)
        
        entity.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5,
        });
        entitylable.attr({
            'font-size':20,
            text:"Entity"
        });
    
        return s.g(entity,entitylable)
        
    }

    ```

    * Here _s.rect(x,y,width, height)_ is used to draw a rectangle to the _#svg_ element.
    * _element.attrb({ key:value })_ is used to set style to the drawn element.
    * _s.g(enity1,lable)_ is used to group two elements together , now they will behave as same element.

    * _s.circle(x,y,width,height)_ to draw circle.
    * _s.text(x,y)_ to draw text.
    * _s.line(x1,y1, x2,y2)_ to draw a line segement.
    * _s.polyline(x1,y1, x2,y2, x3,y3 ,....)_  to draw continuous lines.

