function InterfaceItemFactory() {
    this.createItem = function (options) {
        var item;
 
        item = new InterfaceItem({
            
            width : options.width,
            height : options.height,
            x : options.x,
            y : options.y,
            color: options.color,
            action: options.action,
            tileName : options.tileName
            
            
        });
        
        return item;
 
    }
}