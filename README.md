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
    we will use __s__ object to draw elements to html. And __#svg__ is the<br>elemnt(Drawing area) where we will draw the shapes.
    
    Here the drawing area is a svg image with width and height 1200 and 700 respectively.
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

    *  __s.rect(x,y,width, height)__ is used to draw a rectangle to the _#svg_ element.
    * __element.attrb({ key:value })__ is used to set style to the drawn element.
    * __s.g(enity1,lable)__ is used to group two elements together , now they will behave as same element.

    * __s.circle(x,y,width,height)__ to draw circle.
    * __s.text(x,y)__ to draw text.
    * __s.line(x1,y1, x2,y2)__ to draw a line segement.
    * __s.polyline(x1,y1, x2,y2, x3,y3 ,....)__  to draw continuous lines.

4.  To add dragging capability to our shapes we will use<br>
    __Element.drag(onmove, onstart, onend)__ function
    * _onmove_ is a function called when the element is moved!
    * onstart is called when the dragging starts.
    * onend is called when dragging is finished.

    In our code we have :
    ```javascript
    var move = function (dx, dy) {
        this.attr({
            transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
        });
    }

    var start = function () {
        this.data('origTransform', this.transform().local);
    }
    var stop = function () {
        console.log('finished dragging');
    }

    ```

    which we have passed to:

    ```javascript
    // For entity
     entity1.drag(move, start, stop);
    ```
    Same way we have added this functionality each shape.<br>
   
    ```javascript
    $("#addEntityBtn").click(function() {
        let entity1 = createEntity("1st")
        entity1.drag(move, start, stop);
    });

    $("#addProcessBtn").click(function() {
        let proces1 = createProcess("1st")
        proces1.drag(move, start, stop);
    });

    $("#addDataStoreBtn").click(function() {
        let dataStore1 = createDataStore("1st")
        dataStore1.drag(move, start, stop); 
    });

    $("#addArrowBtn").click(function() {
        let arrow1 =createArrow("1st")
        arrow1.drag(move, start, stop);
    });
    ```
     Now our shapes is draggable!
