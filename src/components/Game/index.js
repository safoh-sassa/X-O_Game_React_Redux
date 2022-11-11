import React from 'react'
import Board from '../Board'
import GameSetting from '../GameSetting'
import { connect } from 'react-redux'
import { insertPlayerToX } from '../../actions/actions'
import { insertPlayerToO } from '../../actions/actions'
import { newGame } from '../../actions/actions'
import { setStepNumber } from '../../actions/actions'

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winnerLine: [],
            stepNumber: 0,
            xIsNext: true,
            location: 0,
            winner: false
        };
    }

    handleClick(i) {
        if (this.state.winner)
            return;
        let ArrayTemp = Array(this.props.boardSize * this.props.boardSize).fill(null);
        this.state.stepNumber = this.props.currentStep;
        this.props.xList.forEach(function (element) {
            ArrayTemp[element] = "X"
        });
        this.props.oList.forEach(function (element) {
            ArrayTemp[element] = "O"
        });
        let squares = ArrayTemp;


        if (this.props.boardSize === 1)
            alert("The board size should be 2 at least.");
        else {

            if ( squares[i] === null) {
                squares[i] = this.state.xIsNext ? "X" : "O";

                if (this.state.xIsNext) {
                    this.props.insertPlayerToX(i);

                }
                else {
                    this.props.insertPlayerToO(i);
                }
                if (this.state.winner === true) {
                    this.props.newGame('s');
                    return;
                } else {
                    this.setState({
                        winner: this.calculateWinner(this.state.xIsNext, this.props.boardSize, this.props.winnerLineSize, i)
                    });

                }

            }
            else {

                if (this.state.winner === false)
                    alert('This cell is already clicked. You should click on an empty cell.');
                return;
            }
            this.props.setStepNumber(this.props.currentStep + 1);
            this.setState({
                xIsNext: !this.state.xIsNext,
                location: i
            });
        }
    }


    jumpTo(step) {

        if (step !== 0) {
            this.props.setStepNumber(step);
            this.setState({
                stepNumber: step,
                winner: false,
                xIsNext: (step % 2) === 0
            });
            let XListTemp = this.props.xList.splice();
            let OListTemp = this.props.oList.splice();
            this.props.xList.forEach(function (element) {
                XListTemp.push(element);
            });
            this.props.oList.forEach(function (element) {
                OListTemp.push(element);
            });
            this.props.newGame(this.props.boardSize);
            for (var i = 0; i < step; i++) {
                if (i % 2 === 0) {
                    let index = Math.floor(i / 2);
                    this.props.insertPlayerToX(XListTemp[index]);

                } else {
                    let index = Math.floor(i / 2);
                    this.props.insertPlayerToO(OListTemp[index]);
                }
            }

        } else {
            this.props.setStepNumber(step);
            this.props.newGame();
            this.state.winner = false;
            this.setState({
                stepNumber: 0,
                xIsNext: true,

            });
            if (this.state.winnerLineSize)
                this.props.newGame(this.props.boardSize);
        }
    }

    calculateWinner(isX, BordSize, winnerLineSiz, location) {
        let winnerLineSize = parseInt(winnerLineSiz, 10);
        let result = null;
        let Temp = [];
        let affectedColumns = Array((winnerLineSize * 2) - 1).fill(null);
        let affectedRows = Array((winnerLineSize * 2) - 1).fill(null);
        let affectedFirstDiameter = Array((winnerLineSize * 2) - 1).fill(null);
        let affectedSecondDiameter = Array((winnerLineSize * 2) - 1).fill(null);
        if (isX)
            Temp = this.props.xList;
        else
            Temp = this.props.oList;
        Temp.forEach(function (element) {
            if (element !== null) {
                let xLocation = Math.floor(location / BordSize); // 9 div  5 = 1 in line 2 (div count 5)
                let yLocation = location % BordSize; //9 mod  5 = 4  in column 4 (the rest after divide)
                let xElement = Math.floor(element / BordSize);
                let yElement = element % BordSize;
                if ((xLocation === xElement) && (Math.abs(yLocation - yElement) < winnerLineSize)) {
                    let index = 0;
                    if (yLocation >= yElement)
                        index = winnerLineSize - (yLocation - yElement);
                    else
                        index = winnerLineSize + (yElement - yLocation);
                    affectedRows[index] = element;
                }
                if ((yLocation === yElement) && (Math.abs(xLocation - xElement) < winnerLineSize)) {
                    let index = 0;
                    if (yLocation >= yElement)
                        index = winnerLineSize - (xLocation - xElement);
                    else
                        index = winnerLineSize + (xElement - xLocation);
                    affectedColumns[index] = element;
                }
                if ((yLocation - yElement) === (xLocation - xElement) && (Math.abs(xLocation - xElement) < winnerLineSize)) {
                    let index = 0;
                    if (yLocation >= yElement)
                        index = winnerLineSize - (xLocation - xElement);
                    else
                        index = winnerLineSize + (xElement - xLocation);
                    affectedFirstDiameter[index] = element;
                }
                if ((yElement - yLocation) === (xLocation - xElement) && (Math.abs(xLocation - xElement) < winnerLineSize)) {
                    let index = 0;
                    if (yLocation <= yElement)
                        index = winnerLineSize - (xLocation - xElement);
                    else
                        index = winnerLineSize + (xElement - xLocation);
                    affectedSecondDiameter[index] = element;
                }
            }
        });
        result = this.checkList(affectedColumns, winnerLineSize);
        result = result || this.checkList(affectedRows, winnerLineSize);
        result = result || this.checkList(affectedFirstDiameter, winnerLineSize);
        result = result || this.checkList(affectedSecondDiameter, winnerLineSize);
        return result;
    }

    checkList(list, winnerLineSize) {
        let result = false;
        let resultLine = [];
        let score = 0;
        list.forEach(function (element) {

            if (result === false) {
                if (element !== null) {
                    score++;
                    resultLine.push(element);
                    if (score >= parseInt(winnerLineSize, 10)) {
                        result = true;
                    }
                } else {
                    score = 0;
                    resultLine = [];
                }
            }

        });
        this.state.winnerLine = resultLine;
        return result;
    }
    render() {

        let current = '';
        let ArrayTemp = Array(this.props.boardSize * this.props.boardSize).fill(null);
        this.state.stepNumber = this.props.currentStep;
        this.props.xList.forEach(function (element) {
            ArrayTemp[element] = "X"
        });
        this.props.oList.forEach(function (element) {
            ArrayTemp[element] = "O"
        });

        const moves = ArrayTemp.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'New Game';
            if (move < this.state.stepNumber) {
                return (
                    <li key={move}>
                        <button id={'moveBtn-' + move} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            } else
                return null;
        });
        let status;
        if (this.state.winner) {
            status = "Winner: " + (this.state.xIsNext === true ? "O" : "X");

        } else {
            if (this.state.stepNumber < (this.props.boardSize * this.props.boardSize))
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            else
                status = "Equality.";
        }


        return (
            <div>
                <div className="game-settings">
                    <GameSetting
                        boardSize={this.props.boardSize}

                        winnerLineSize={this.props.winnerLineSize}

                        stepNumber={this.state.stepNumber}
                    />
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={ArrayTemp}
                            onClick={i => this.handleClick(i)}
                            Location={this.state.Location}
                            winnerLine={this.state.winnerLine}
                            winner={this.state.winner}
                        />
                    </div>
                    <div className="game-info">
                        <div>
                            <h3>{status}</h3>
                        </div>


                        {ArrayTemp.length > 0 &&
                            <ol>
                                {moves}
                            </ol>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        boardSize: state.boardSize,
        history: state.history,
        currentStep: state.currentStep,
        winnerLineSize: state.winnerLineSize,
        xList: state.xList,
        oList: state.oList,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        insertPlayerToX: index => {
            dispatch(insertPlayerToX(index))
        },

        insertPlayerToO: index => {
            dispatch(insertPlayerToO(index))
        },
        newGame: d => {
            dispatch(newGame(d))
        },
        setStepNumber: step => {
            dispatch(setStepNumber(step))
        }
    }
}

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent)

export default Game;