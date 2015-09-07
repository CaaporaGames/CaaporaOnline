/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var MiniMap = function(){
    
     var itemFactory = new InterfaceItemFactory();

            
            // primeiro tile do minimapa
            this.miniMapTileBase = itemFactory.createItem({
                width: 100,
                height: 100,
                color: '#00BF32',
                x: 670,
                y: 470,
                tileName: 'ground'

            });
            
            // segundo tile
            itemFactory.createItem({
                width: 100,
                height: 100,
                color: '#00BF32',
                x: (this.miniMapTileBase.positionX + 25),
                y: (this.miniMapTileBase.positionY + 12),
                tileName: 'ground'

            });
            
            
            // segundo tile
            itemFactory.createItem({
                width: 100,
                height: 100,
                color: '#00BF32',
                x: (this.miniMapTileBase.positionX),
                y: (this.miniMapTileBase.positionY + 12),
                tileName: 'ground'

            });


            this.playerPonto = itemFactory.createItem({
                width: 3,
                height: 3,
                color: '#000',
                x: 670,
                y: 470

            });



            this.enemyPonto = itemFactory.createItem({
                width: 3,
                height: 3,
                color: '#f00',
                x: 670,
                y: 470

            });

    
    
};
