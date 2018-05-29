var map = []
    // zzz = []
    // var col = function(col) {
    //     for (var i = 0; i < col; i++) {
    //         zzz[i] = 0
    //     }
    // }
    // // 给行数，生成一个 1 维数组
    // var line = function(line) {
    //     for (var i = 0; i < line; i++) {
    //         map[i] = zzz
    //     }
    // }

    // 给行数，生成一个 1 维数组
    var line = function(line) {
        for (var i = 0; i < line; i++) {
            map[i] = []
        }
    }
    // 给列数，生成一个 2 维数组
    var column = function(col) {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < col; j++) {
                map[i][j] = 0
            }
        }
    }
    // 给列数和行数生成空地图
    var blankMap = function(col, lie) {
        line(lie)
        column(col)
    }
    blankMap(10, 10)

    // 给出地雷数量让后随机写入地雷
    var writeInMine = function(num) {
        // 随机位置写入
        var x = 0
        var y = 0
        var randomLocation = function() {
            x = Math.floor(Math.random() * map[0].length)
            y = Math.floor(Math.random() * map.length)
            if (map[x][y] !== 'x') {
                map[x][y] = 'x'
            } else {
                randomLocation()
            }
        }
        for (var i = 0; i < num; i++) {
            randomLocation()
        }
    }
    // 使用循环给雷的边上所有数 +1 , 已经是雷的除外
    var writeInHint = function() {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[0].length; j++) {
                if (map[i][j] === 'x') {
                    // 上下边 6个加 1,
                    map[i-1][j-1] = map[i-1][j-1] + 1
                    // map[i-1][j] = map[i-1][j] + 1
                    // map[i-1][j+1] = map[i-1][j+1] + 1
                    // map[i+1][j-1] = map[i+1][j-1]+ 1
                    // map[i+1][j] = map[i+1][j] + 1
                    // map[i+1][j+1] = map[i+1][j+1] + 1

                    // // 两边的 2个加 1
                    map[i][j+1] = map[i][j+1] + 1
                    map[i][j-1] = map[i][j-1] + 1
                }
            }
        }
    }
    blankMap(10, 10)
    writeInMine(20)
    writeInHint()


// 看事件委托和事件冒泡 https://www.cnblogs.com/liugang-vip/p/5616484.html 看这个文章
// 解决事件委托中的问题

// break 不能用在 function 里

// CSS中的<li>之间的空白间隔问题
// https://blog.csdn.net/zhouziyu2011/article/details/59057780

// 学习 css 中的 cursor 属性

// 关于 clearInterval
