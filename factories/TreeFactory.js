    var TreeFactory = function() {
        this.createTree = function (options) {


           // this.tree;
            this.tileSize = options.tileSize;
            this.xt = options.xt;
            this.yt = options.yt;
            this.isoGroup = options.isoGroup;
            this.tileName = options.tileName;

            this.tree = new Tree({
                isoGroup: this.isoGroup,
                tileName: this.tileName,
                tileSize : this.tileSize,
                xt : this.xt,
                yt : this.yt


            });

            return this.tree;

        };
    };
