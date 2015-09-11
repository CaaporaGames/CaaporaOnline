function InterfaceItemFactory() {
    this.createItem = function (options) {
        var item;
 
        item = new InterfaceItem({
            name : options.name,
            width : options.width,
            height : options.height,
            x : options.x,
            y : options.y,
            color: options.color,
            action: options.action,
            tileName : options.tileName,
            mapMaker : options.mapMaker
            
            
        });
        
        return item;
 
    }
}