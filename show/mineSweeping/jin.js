/*
扫雷游戏：

初级：10个  9*9
中级：40个  16*16
高级：99个  28*28

第一步：
输出一个

    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]

这样的数组，其中需要的数值有：1，雷的数量  2，行数和列数

    实现步骤：
        1，根据行数和列数创建一个多维数组（使用 for 循环嵌套实现）
        2，然后使用 Math 随机 a[x][x] 来写入雷的位置（再次使用 for 循环，写入 1）
              如果位置已经有雷了就重写随机然后写入
        3，bibibibibi --> 实现上述的数组
              过程：1，先生成一行
                2，复制成列
                3.塞入雷
                   4.写一个函数实现：如果数组位置上的值为 1 的话，就给边上一圈的值加 1，

第二步：
进行操作：
    当点击到 0 的值的时候，
    开始遍历边上一圈的值（打开所有边上的值），如果值也是 0 的话，就接着遍历边上一圈的值，直到没有为止。
        这里可以写一个函数，当点击到 0 的时候就用这个函数，然后给边上还是 0 的继续使用这个函数
*/

// 1，成一张雷的地图
var mineSweepingMap = function(r, c, num) {
    var map = []
    // 给行数，生成一个 1 维数组
    var row = function(r) {
        for (var i = 0; i < r; i++) {
            map[i] = new Array()
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
    var blankMap = function(r, col) {
        row(r)
        column(col)
    }

    // 给出地雷数量让后随机写入地雷
    var writeInMine = function(num) {
        // 随机位置写入
        var randomLocation = function() {
            var x = Math.floor(Math.random() * r)
            var y = Math.floor(Math.random() * c)
            // console.log( ':', x, y);
            if (map[x][y] !== 9) {
                map[x][y] = 9
            } else {
                randomLocation()
            }
        }
        for (var i = 0; i < num; i++) {
            randomLocation()
        }
    }

    // 使用循环给雷的边上所有数 +1 , 已经是雷的除外
    var plus = function(array, x, y) {
        if (x >= 0 && x < r && y >= 0 && y < c) {
            if (array[x][y] !== 9) {
                array[x][y] += 1
            }
        }
    }
    var writeInHint = function() {
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[0].length; y++) {
                if (map[x][y] === 9) {
                    // 上下 6 个
                    for (var i = -1; i < 2; i++) {
                        plus(map, x - 1, y + i)
                        plus(map, x + 1, y + i)
                    }
                    // 左右 2 个
                    plus(map, x, y + 1)
                    plus(map, x, y - 1)
                }
            }
        }
    }

    blankMap(r, c)
    writeInMine(num)
    writeInHint()
    return map
}

// 2，将雷写入页面
var writeHtml = function(map) {
    // 先通过 y轴数量写入 ul，然后通过 x轴上的数量写入 li
    var x = document.querySelector('.gameBox')
    for (var i = 0; i < map.length; i++) {
        x.innerHTML = x.innerHTML + `<ul class="row x-${i}" data-x="${i}"></ul>`
    }

    var z = document.querySelectorAll('.row')
    for (var i = 0; i < z.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
            var m = map[i][j]
            if (m === 0) {
                m = ''
            }
            z[i].innerHTML = z[i].innerHTML + `
                <li class="col y-${j} num-${m}" data-y="${j}">
                    <span>${m}</span>
                    <img src="flag.svg" class="img-flag hide">
                </li>`
        }
    }
}

// 判断是否胜利
var changeClearMineNum = function(clearMineNum) {
    // console.log('zmzmzmzm');
    // console.log('zz', zz);
    if (clearMineNum === ((col * row) - num)) {
        var all = document.querySelectorAll('.col')
        var allNum = 0
        var stop = setInterval(function() {
            var r = Math.floor(Math.random() * 256)
            var g = Math.floor(Math.random() * 256)
            var b = 210
            // var b = Math.floor(Math.random() * 256)
            all[allNum].children[0].style.opacity = `0`
            all[allNum].children[1].style.opacity = '0'
            all[allNum].style.background = `rgba(${r},${g},${b},0.6)`
            allNum++
            if (allNum === all.length) {
                clearInterval(stop)
                if (zz === 0) {
                    alert('你成功啦~！！晚上吃肉~~！')
                    initializeGame(row, col, num)
                }
                initializeGame(row, col, num)
            }
        }, 20)
    }
}

// 3，扫雷过程
var clearMine = function(row, col, num) {
    var clearMineNum = 0
    var makeWhite = function(x, y) {
        if (x < row && y < col && x >= 0 && y >= 0) {
            var el = document.querySelector(`.x-${x}`).children[y]
            // 需要注意这个 ！== 'white' ，如果不加这个就会进入无限循环
            if (el.style.background !== 'white') {
                el.style.background = 'white'
                el.children[0].style.opacity = '1'
                el.children[1].classList.add('hide')
                    clearMineNum++
                    // console.log(clearMineNum, 'clearMineNum');
                    changeClearMineNum(clearMineNum)
                if (el.innerText === '') {
                    showNoMine(x, y)
                }
            }
        }
    }
    // 智能扫雷
    var showNoMine = function(x, y) {
        // console.log(x, y, 'x,y');
        makeWhite(x - 1, y + 1)
        makeWhite(x - 1, y - 1)
        makeWhite(x - 1, y)
        makeWhite(x + 1, y + 1)
        makeWhite(x + 1, y - 1)
        makeWhite(x + 1, y)
        makeWhite(x, y + 1)
        makeWhite(x, y - 1)
    }

    // 给所有方块绑定点击事件，点击显示数字，或者 boom
    var show = function() {
        // var x = document.querySelectorAll('.col')
        var x = document.querySelectorAll('.row')
        for (var i = 0; i < x.length; i++) {
            x[i].addEventListener('click', function(event) {
                var el = event.target
                if (el.tagName != 'LI') {
                    // 因为事件委托的原因
                    // 如果点击到了 span 上面，那么就会出现 bug
                    // 所以如果点击到 span 上面，那么 el 就等于 span 的父节点
                    el = event.target.parentElement
                }
                // 已经被标记的不能点击
                var flag = el.children[1].classList.contains('hide')
                if (el.tagName === 'LI' && flag) {
                    if (el.children[0].innerText !== '9' && el.style.background !== 'white') {
                        el.children[0].style.opacity = '1'
                        el.style.background = 'white'
                        clearMineNum++
                        changeClearMineNum(clearMineNum)
                        // console.log(clearMineNum, 'clearMineNum');
                    } else if (el.children[0].innerText === '9' ) {
                        // el.children[0].style.opacity = '1'
                        zz = 1
                        el.classList.add('boom')
                        alert('游戏失败')
                        var all = document.querySelectorAll('.col')
                        var ff = []
                        var allNum = 0
                        // 这里做了个小动画，失败的时候慢慢的显示雷的位置
                        for (var i = 0; i < all.length; i++) {
                            if (all[i].children[0].innerText === '9') {
                                // all[i].style.background = 'red'
                                ff[allNum] = all[i]
                                allNum++
                            }
                        }
                        allNum = 0
                        var time = 60
                        if (num > 50) {
                            time = 10
                        } else if (num > 10) {
                            time = 25
                        }
                        var stop = setInterval(function() {
                            ff[allNum].classList.add('boom')
                            allNum++
                            if (allNum === ff.length) {
                                clearInterval(stop)
                                // console.log('stop');
                            }
                        }, time)
                        // var box = document.querySelector('.gameBox')
                        // box.innerHTML = ''
                        // var level = event.target.innerHTML
                        // var body = document.querySelector('body')
                        // initializeGame(row, col, num)
                    }
                    // 如果点击的方格为空（什么有没有），那么周围没有点开的空方格都会被点开
                    if (el.children[0].innerText === '') {
                        // 获取到位置
                        var x = parseInt(el.parentElement.dataset.x)
                        var y = parseInt(el.dataset.y)
                        // console.log(x,y, 'data');
                        // 背景变成白色
                        showNoMine(x, y)
                    }
                }
            })
        }
        for (var i = 0; i < x.length; i++) {
            var mineNum = num
            x[i].addEventListener('contextmenu', function(event) {
                event.preventDefault();
                var btnNum = event.button
                var  el = event.target
                if (el.tagName != 'LI') {
                    // 因为事件委托的原因
                    // 如果点击到了 span 上面，那么就会出现 bug
                    // 所以如果点击到 span 上面，那么 el 就等于 span 的父节点
                    el = event.target.parentElement
                }
                if (el.tagName === 'LI') {
                    var classList = el.children[1].classList
                    // 已经被点击过的地方不能标记
                    if (classList.contains('hide') && el.style.background !== 'white') {
                        var residue = document.querySelector('.residue')
                        if (mineNum !== 0) {
                            mineNum--
                        }
                        residue.innerText = `${mineNum}`
                        classList.remove('hide')
                    } else if (el.style.background !== 'white') {
                        classList.add('hide')
                    }
                }
            })
        }
    }
    show()
}

// 4，清除画面，然后写入新的画面
var stopTime
var initializeGame = function(row, col, num) {
    var residue = document.querySelector('.residue')
    residue.innerText = `${num}`
    var time = document.querySelector('.tick')
    time.innerText = `0`
    var i = 1
    clearInterval(stopTime)
    stopTime = setInterval(function() {
        time.innerText = `${i++}`
    }, 1000)
    // zz
    zz = 0
    // 首先清除原来的地图，然后重新初始化
    var box = document.querySelector('.gameBox')
    box.innerHTML = ''
    var body = document.querySelector('body')
    body.style.minWidth = `${27 * col}px`
    var map = mineSweepingMap(row, col, num)
    writeHtml(map)
    clearMine(row, col, num)
}

// 5，选择游戏等级，给按钮绑定功能
var Btn = function() {
    var level = document.querySelectorAll('.choice-level')
    for (var i = 0; i < level.length; i++) {
        level[i].addEventListener('click', function(event) {
            var level = event.target.innerHTML
            if (level === '初级') {
                row = 9
                col = 9
                num = 10
                initializeGame(row, col, num)
            } else if (level === '中级') {
                row = 16
                col = 16
                num = 40
                initializeGame(row, col, num)
            } else if (level === '高级') {
                row = 16
                col = 30
                num = 99
                initializeGame(row, col, num)
            }
        })
    }
    var restart = document.querySelector('.restart')
    restart.addEventListener('click', function(event) {
        initializeGame(row, col, num)
    })
}
Btn()

// 6，初始数据
// zz 用来确定是否已经点到地雷
var zz = 0
var row = 16
var col = 16
var num = 40
initializeGame(row, col, num)

// 给一个坐标，把四周变成白色

// 根据
// 绑定鼠标右击事件，右击鼠标的时候进行标记，
    // 这个时候要进行 css 的变化
// 当所有地雷被标记，或者说所有数组中只剩 9，游戏成功。

// 选择游戏难度
