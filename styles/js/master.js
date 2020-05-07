function runGame() {
        let themes = [
        {
            name: 'NEON',
            boardBorderColor: '#1f1f1f',
            lightBoxColor: '#ffffff',
            darkBoxColor: '#4666ff',
            optionColor: '#023850',
            optionHoverColor: '#3385ff'
        },
        {
            name: 'CLASSIC',
            boardBorderColor: '#666',
            lightBoxColor: '#fff',
            darkBoxColor: '#ccc',
            optionColor: '#000',
            optionHoverColor: '#999'
        },
        {   
            name: 'WOOD',
            boardBorderColor: '#803E04',
            lightBoxColor: '#FFCE9E',
            darkBoxColor: '#D18B47',
            optionColor: '#803E04',
            optionHoverColor: '#311B0B'
        },
        {
            name: 'OCEAN',
            boardBorderColor: '#023850',
            lightBoxColor: '#fff',
            darkBoxColor: '#0A85AE',
            optionColor: '#023850',
            optionHoverColor: '#3385ff'
        },
        {
            name: 'FOREST',
            boardBorderColor: '#005900',
            lightBoxColor: '#CAC782',
            darkBoxColor: '#008C00',
            optionColor: '#005900',
            optionHoverColor: '#0c0'
        },
        {
            name: 'BLOOD',
            boardBorderColor: '#f3f3f3',
            lightBoxColor: '#f3f3f3',
            darkBoxColor: '#f00',
            optionColor: '#f00',
            optionHoverColor: '#f99'
        }
    ];

    let colors = [
        {
            name: 'BLACK',
            color: '#000'
        }, 
        {
            name: 'GREEN',
            color: '#030'
        }, 
        {
            name: 'BLUE',
            color: '#036'
        }, 
        {
            name: 'PINK',
            color: '#606'
        }, 
        {
            name: 'BROWN',
            color: '#630'
        }
    ];

    let colorOption = 0;
    let themeOption = 2;

    document.getElementById('theme-option').addEventListener('click', function() {
        themeOption === themes.length - 1 ? themeOption = 0 : themeOption++;
        console.log(themeOption)
        setTheme()
    })

    var setTheme = function() {
        let theme = themes[themeOption]
        // console.log(theme)
        document.getElementById('theme-option').innerHTML = theme.name
        document.getElementById('board').style.borderColor = theme.boardBorderColor

        // light box
        let LB = document.querySelectorAll('.light-box')
        for (let i = 0; i < LB.length; i++) {
            // console.log(LB[i])
            LB[i].style.backgroundColor = theme.lightBoxColor
        }

        // Dark Box
        let DB = document.querySelectorAll('.dark-box')
        for (let i = 0; i < DB.length; i++) {
            // console.log(DB[i])
            DB[i].style.backgroundColor = theme.darkBoxColor
        }

        // Option Nav
        let ON = document.querySelectorAll('.option-nav')
        for (let i = 0; i < ON.length; i++) {
            ON[i].style.color = theme.optionColor
        }
        

        // 
        document.getElementById('option').style.color = theme.optionColor
        // option hover
        // $('#option').hover(
            //     function() {
            //         $(this).css('color', theme.optionHoverColor);
            //     }, function() {
            //         $(this).css('color', theme.optionColor);
            //     }
            // );
        
        document.getElementById('undo-btn').style.color = theme.optionColor
        // $('#undo-btn').hover(
        //         function() {
        //             $(this).css('color', theme.optionHoverColor);
        //         }, function() {
        //             $(this).css('color', theme.optionColor);
        //         }
        //     );
        
        document.getElementById('option-menu').style.color = theme.optionColor
        // $('.button').css('color', theme.optionColor);
        //     $('.button').hover(
        //         function() {
        //             $(this).css('color', theme.optionHoverColor);
        //         }, function() {
        //             $(this).css('color', theme.optionColor);
        //         }
        //     );
    }


    document.getElementById('color-option').addEventListener('click', function() {
        colorOption === colorOption.length - 1 ? colorOption = 0 : colorOption++

        setColor()
    })

    document.getElementById('back-btn').addEventListener('click', function(){
        document.getElementById('option-menu').classList.add('hide')
        document.getElementById('game').style.opacity = 1
    })

    var setColor = function() {
        let color = colors[colorOption]
        document.getElementById('color-option').innerHTML = color['name']

        let B = document.querySelectorAll('.box')
        for (let i = 0; i < B.length; i++) {
            B[i].style.color = color['color']
        }
        document.getElementById('pawn-promotion-option').style.color = color['color']
        document.getElementById('player').style.color = color['color']
    }

    // Chess Pieces
    let chessPieces = {
        'white': {
           'king'  : '&#9812;',
           'queen' : '&#9813;',
            'rook'  : '&#9814;',
            'bishop': '&#9815;',
            'knight': '&#9816;',
            'pawn'  : '&#9817;'
         },
         'black': {
            'king'  : '&#9818;',
            'queen' : '&#9819;',
            'rook'  : '&#9820;',
            'bishop': '&#9821;',
            'knight': '&#9822;',
            'pawn'  : '&#9823;'
         }
    };

    let player = 'white'

    let select = {
        canMove: false,
        piece: '',
        box: ''
    }

    // pieces + positions
    let historyMoves = []

    let promotion = {}

    document.getElementById('player').innerHTML = chessPieces.white.king
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            let box = document.getElementById('box-' + i + '-' + j)
            if((i + j) % 2 !== 0){
                box.classList.add('light-box')
            } else {
                box.classList.add('dark-box')
            }
            setNewBoard(box, i, j)
        }
    }
    setColor()
    setTheme()

    document.getElementById('option').addEventListener('click', function() {
        var g = document.getElementById('game')
        var o = document.getElementById('option-menu')
        if(o.classList.contains('hide')){
            o.classList.remove('hide')
            g.style.opacity = 0.3
        }
        else {
            o.classList.add('hide')
            g.style.opacity = 1   
        }
    })


    document.getElementById('undo-btn').addEventListener('click', function() {
        if (historyMoves.length === 0) {
            return
        }

        let move = historyMoves.pop()

        let previous = move.previous
        console.log("previous = ")
        console.log(previous)
        setPiece(previous.box, previous.piece.split('-')[0], previous.piece.split('-')[1])

        let current = move.current

        if (current.piece === '') {
            let currentBox = document.getElementById(current.box)
            currentBox.innerHTML = ''
            currentBox.setAttribute('piece',"")
            currentBox.classList.remove('placed')
        } else {
            setPiece(current.box, current.piece.split('-')[0], current.piece.split('-')[1])
        }

        let box = document.querySelectorAll('.box')
        for (var i = 0; i < box.length; i++) {
            box[i].classList.remove('selected')
            box[i].classList.remove('suggest')
        }

        switchPlayer()

        select = {
            canMove: false,
            piece: '',
            box: ''
        }
    })

    let pawnPromo = document.querySelectorAll('#pawn-promotion-option .option')
    // console.log(pawnPromo)
    for (var i = 0; i < pawnPromo.length; i++) {
        pawnPromo[i].addEventListener('click', function () {
            checkWinner()
            let newPiece = this.getAttribute('id')
            // this = pawnPromo[i] maybe if error  check this
            promotion.box.innerHTML = chessPieces[promotion.color][newPiece]
            promotion.box.classList.add('placed')
            promotion.box.setAttribute('piece', promotion.color + '-' + newPiece)

            document.getElementById('pawn-promotion-option').classList.add('hide')
            document.getElementById('game').style.opacity = 1

            promotion = {}
        })
    }

    document.getElementById('restart-btn').addEventListener('click', function() {
        resetGame()
    })

    document.getElementById('result').addEventListener('click', function() {
        resetGame()
    })

    let B = document.querySelectorAll('.box')
    for (var i = 0; i < B.length; i++) {
        B[i].addEventListener('click', function(){
            // try using box[i] if this does not work
            if(this.classList.contains('selected')){
                this.classList.remove('selected')
                let BB = document.querySelectorAll('.box')
                for (var i = 0; i < BB.length; i++) {
                    BB[i].classList.remove('suggest')
                }

                select = {
                    canMove: false,
                    piece: '',
                    box: ''
                }
                return
            }
            // Select new Box
            if (!select.canMove) {
                // Check the right color to play
                if(this.getAttribute('piece').indexOf(player) >= 0){
                    selectPiece(this)
                }
            }

            else if(select.canMove) {
                let color = select.piece.split('-')[0]
                let type = select.piece.split('-')[1]

                if(this.getAttribute('piece').indexOf(color) >= 0){
                    document.getElementById(select.box).classList.remove('selected')
                    let BB = document.querySelectorAll('.box')
                    for (var i = 0; i < BB.length; i++) {
                        BB[i].classList.remove('suggest')
                    }

                    selectPiece(this)
                    return;
                }

                // Can move if this is valid
                if(this.classList.contains('suggest')){
                    let move = {
                        previous: {piece:'', box:''},
                        current: {piece:'', box:''}
                    }

                    move.previous.piece = select.piece;
                    move.previous.box = select.box

                    move.current.piece = this.getAttribute('piece')
                    move.current.box = this.getAttribute('id')

                    historyMoves.push(move)

                    setPiece(this, color, type)
                    console.log(select.box)
                    deleteBox(select.box)

                    let BB = document.querySelectorAll('.box')
                    for (var i = 0; i < BB.length; i++) {
                        BB[i].classList.remove('suggest')
                    }
                    select = {canMove: false, piece: '', box:''}

                    switchPlayer();
                }
            }

        })
    }

    function selectPiece(box) {
        box.classList.add('selected')
        select.box = box.getAttribute('id')
        select.piece = box.getAttribute('piece')
        select.canMove = true

        suggestNextMoves(getNextMoves(select.piece, select.box))
    }

    function getNextMoves(selectedPiece, selectedBox) {
        let color = selectedPiece.split('-')[0]
        let type = selectedPiece.split('-')[1]

        let i = parseInt(selectedBox.split('-')[1])
        let j = parseInt(selectedBox.split('-')[2])

        let nextMoves = []

        switch(type) {
                  case 'pawn':
                        if(color === 'black') {
                             var moves = [
                                  [0, 1],
                                  [0, 2],
                                  [1, 1],
                                  [-1, 1]
                             ];
                        } else {
                             var moves = [
                                  [0, -1],
                                  [0, -2],
                                  [1, -1],
                                  [-1, -1]
                             ];
                        }
                        nextMoves = getPawnMoves(i, j, color, moves);
                        break;
                  case 'rook':
                        var moves = [
                             [0, 1],
                             [0, -1],
                             [1, 0],
                             [-1, 0]
                        ];
                        nextMoves = getQueenMoves(i, j, color, moves);
                        break;
                  case 'knight':
                        var moves = [
                             [-1, -2],
                             [-2, -1],
                             [1, -2],
                             [-2, 1],
                             [2, -1],
                             [-1, 2],
                             [2, 1],
                             [1, 2]
                        ];
                        nextMoves = getKnightMoves(i, j, color, moves);
                        break;
                  case 'bishop':
                        var moves = [
                             [1, 1],
                             [1, -1],
                             [-1, 1],
                             [-1, -1]
                        ];
                        nextMoves = getQueenMoves(i, j, color, moves);
                        break;
                  case 'queen':
                        var moves1 = [
                             [1, 1],
                             [1, -1],
                             [-1, 1],
                             [-1, -1]
                        ];
                        var moves2 = [
                             [0, 1],
                             [0, -1],
                             [1, 0],
                             [-1, 0]
                        ];
                        nextMoves = getQueenMoves(i, j, color, moves1)
                                        .concat(getQueenMoves(i, j, color, moves2));
                        break;
                  case 'king':
                        var moves = [
                             [1, 1],
                             [1, -1],
                             [-1, 1],
                             [-1, -1],
                             [0, 1],
                             [0, -1],
                             [1, 0],
                             [-1, 0]
                        ];
                        nextMoves = getKnightMoves(i, j, color, moves);
                        break;
                  default: 
                        break;
             }
             return nextMoves;
    }

    function getPawnMoves(i, j, color, moves) {
        let nextMoves = []

        for (var index = 0; index < moves.length; index++) {
            let PI = i + moves[index][0]
            let PJ = j + moves[index][1]

            if (!(PI < 0 || PI >= 8 || PJ < 0 || PJ >= 8)) {
                let box = document.getElementById('box-' + PI + '-' + PJ)

                if (index === 0) {
                    if(!box.classList.contains('placed')){
                        nextMoves.push([PI, PJ])
                    } else {
                        index++;
                    }
                }
                else if (index === 1){
                    if( ((color === 'black' && j === 1) || (color === 'white' && j === 6)) && !box.classList.contains('placed') ){
                        nextMoves.push([PI, PJ])
                    }
                }
                else if (index > 1){
                    if(box.getAttribute('piece') !== '' && box.getAttribute('piece').indexOf(color) < 0){
                        nextMoves.push([PI, PJ])
                    }
                }
            }
        }

        return nextMoves
    }

    function getQueenMoves(i, j, color, moves) {
        var nextMoves = []
        for(var move of moves) {
            let PI = i + move[0]
            let PJ = j + move[1]
            let flag = true

            while(flag && !(PI < 0 || PI >= 8 || PJ < 0 || PJ >= 8)){
                let box = document.getElementById('box-' + PI + '-' + PJ)
                if(box.classList.contains('placed')){
                    if(box.getAttribute('piece').indexOf(color) >= 0){
                        flag = false
                    } else {
                        nextMoves.push([PI, PJ])
                        flag = false
                    }
                }
                if (flag) {
                    nextMoves.push([PI, PJ])
                    PI += move[0]
                    PJ += move[1]
                }
            } 
        }
        return nextMoves
    }

    function getKnightMoves(i, j, color, moves) {
        let nextMoves = []
        for(var move of moves) {
            let PI = i + move[0]
            let PJ = j + move[1]
            if (!(PI < 0 || PI >= 8 || PJ < 0 || PJ >= 8)) {
                let box = document.getElementById('box-' + PI + '-' + PJ)
                if(!box.classList.contains('placed') || box.getAttribute('piece').indexOf(color) < 0){
                    nextMoves.push([PI, PJ])
                }
            }
        }
        return nextMoves
    }

    function suggestNextMoves(nextMoves) {
        for (var move of nextMoves) {
            document.getElementById('box-' + move[0] + '-' + move[1]).classList.add('suggest')
        }
    }

    function setPiece(box, color, type) {



        //Check end game (if king is defeated)
        // if(box.attr('piece').indexOf('king') >= 0) {
        //   showWinner(player);

        //   box.html(chessPieces[color][type]);
        //   box.addClass('placed');
        //   box.attr('piece', color + '-' + type);

        //   return;
        // }
        let j;
        if(box.localName == 'div' || box == ''){
            j = parseInt(box.getAttribute('id').charAt(6))
            //  if(box.getAttribute('piece').indexOf('king') >= 0){
            // // if(){
            //     showWinner(player)
            //     box.innerHTML = chessPieces[color][type]
            //     box.classList.add('placed')
            //     box.setAttribute('piece', color + '-' + type)
            //     return
            // }
        } else {
            j = parseInt(box.charAt(6))
        }

        if(type === 'pawn'){
            if((player === 'black' && j === 7)||(player === 'white' && j == 0)){
                document.getElementById('game').style.opacity = 0.5
                document.getElementById('pawn-promotion-option').classList.remove('hide')
                document.getElementById('queen').innerHTML = chessPieces[player].queen
                document.getElementById('rook').innerHTML = chessPieces[player].rook
                document.getElementById('knight').innerHTML = chessPieces[player].knight
                document.getElementById('bishop').innerHTML = chessPieces[player].bishop

                promotion = {box: box, color: color}
                checkWinner()

                return
            }
        }
        if(box.localName == 'div'){
            box.innerHTML = chessPieces[color][type]
            box.classList.add('placed')
            box.setAttribute('piece', color + '-' + type)
        } else {
            let BB = document.getElementById(box)
            BB.innerHTML = chessPieces[color][type]
            BB.classList.add('placed')
            BB.setAttribute('piece', color + '-' + type)
        }
        
    }

    function deleteBox(box) {

        console.log(box)              
        if (typeof box == "object"){        
            for (var i = 0; i < box.length; i++) {
                    box[i].classList.remove('placed')
                    box[i].classList.remove('selected')
                    box[i].classList.remove('suggest')
                    box[i].innerHTML = ''
                    box[i].setAttribute('piece' , '')
            }
        }
        else {
            let container = document.getElementById(box)
            container.classList.remove('placed')
            container.classList.remove('selected')
            container.classList.remove('suggest')
            container.innerHTML = ''
            container.setAttribute('piece' , '')
        }
    }

    function setNewBoard(box, i, j){
        if(j === 7) {
          if(i === 0 || i === 7) {
                setPiece(box, 'white', 'rook');
          } else if(i === 1 || i === 6) {
                setPiece(box, 'white', 'knight');
          } else if(i === 2 || i === 5) {
                setPiece(box, 'white', 'bishop');
          } else if(i === 3) {
                setPiece(box, 'white', 'queen');
          } else if(i === 4) {
                setPiece(box, 'white', 'king');
          }
     } else if(j === 6) {
          setPiece(box, 'white', 'pawn');
     } else if(j === 1) {
          setPiece(box, 'black', 'pawn');
     } else if(j === 0) {
          if(i === 0 || i === 7) {
                setPiece(box, 'black', 'rook');
          } else if(i === 1 || i === 6) {
                setPiece(box, 'black', 'knight');
          } else if(i === 2 || i === 5) {
                setPiece(box, 'black', 'bishop');
          } else if(i === 3) {
                setPiece(box, 'black', 'queen');
          } else if(i === 4) {
                setPiece(box, 'black', 'king');
          }
     }
    }

    function switchPlayer() {

        checkWinner()
        if (player === 'black') {
            document.getElementById('player').innerHTML = chessPieces.white.king
            player = 'white'
            document.getElementById('game').style.transform = "rotate(0deg)";
        } else {
            document.getElementById('player').innerHTML = chessPieces.black.king
            player = 'black'
            document.getElementById('game').style.transform = "rotate(180deg)";
            
        }
    }

    function resetGame() {
        deleteBox(document.querySelectorAll('.box'))

        document.getElementById('player').innerHTML = chessPieces.white.king
        document.getElementById('result').classList.add('hide')
        document.getElementById('option-menu').classList.add('hide')
        document.getElementById('game').style.opacity = 1

        for (var i = 0; i < 8; i++) {
            for(var j = 0; j < 8 ; j++){
                let box = document.getElementById('box-' + i + '-' + j)
                setNewBoard(box, i, j)
            }
        }

        player = 'white'
        select = {
            canMove: false,
            piece: '',
            box: ''
        }

        historyMoves = []
        promotion = {}
    }

    function showWinner(winner) {
        historyMoves = []
        promotion = {}
        setTimeout(function() {
            let result = document.getElementById('result')
            if (winner === 'DRAW') {
                result.style.color = '#000'
                result.innerHTML = winnner
            } else {
                result.style.color = winner + ''
                result.innerHTML = chessPieces[winner].king
            }
            result.classList.remove('hide')
            document.getElementById('game').style.opacity = 0.5
        }, 1)
    }

    function checkWinner(){
        let allBoxes = document.querySelectorAll('.box')
        let wc = 0
        let bc = 0
        for(var i = 0; i < allBoxes.length ; i++){
            if (allBoxes[i].getAttribute('piece') == 'white-king' ) {
                wc = 1
            }
            if (allBoxes[i].getAttribute('piece') == 'black-king') {
                bc = 1
            }
        }
       
        if(wc == 0){
            // console.log('black')
            showWinner('black')
        }
        if(bc == 0){
            // console('white')
            showWinner('white')
        }
    }
}