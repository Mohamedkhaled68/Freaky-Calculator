import React, { useState } from 'react';
const op = ['+', '-', '/', '*'];

const App = () => {
    return (
        <div>
            <Calculator />
        </div>
    );
};

const Calculator = () => {
    const [nums, setNums] = useState('');
    const [resultColor, setResultColor] = useState(false);
    const handelNumClick = (num) => {
        if (op.includes(num) && nums.endsWith(num)) return;
        if (op.includes(num) && !nums) return;
        if (resultColor) {
            setNums('');
            setNums((prev) => prev + num);
            setResultColor(false);
        } else {
            setNums((prev) => prev + num);
        }
    };

    const handleSum = () => {
        setNums((prev) => eval(prev));
        setResultColor(true);
    };
    return (
        <>
            <div className="box">
                <button
                    onClick={() => {
                        setNums('');
                        setResultColor(false);
                    }}
                    className="clearBtn"
                >
                    Clear
                </button>
                <ShowScreen color={resultColor}>{nums}</ShowScreen>
                <div className="btns">
                    <Buttons onNum={handelNumClick}>
                        <span className="btnNum" onClick={handleSum}>
                            =
                        </span>
                        <span
                            className="btnNum"
                            onClick={(e) => handelNumClick(e.target.innerText)}
                        >
                            0
                        </span>
                        <span className="btnNum">.</span>
                    </Buttons>
                </div>
            </div>
        </>
    );
};

const ShowScreen = ({ children, color }) => {
    return (
        <div className="screen">
            <p className={color ? 'red' : ''}>{children}</p>
        </div>
    );
};

const Operators = ({ onNum }) => {
    return (
        <>
            <div className="ops">
                {op.map((op, idx) => (
                    <span
                        onClick={(e) => onNum(e.target.innerText)}
                        className="btnOp"
                        key={idx}
                    >
                        {op}
                    </span>
                ))}
            </div>
        </>
    );
};
const Buttons = ({ children, onNum }) => {
    const arr = [];
    for (let i = 1; i < 10; i++) {
        arr.push(i);
    }
    return (
        <>
            <Operators onNum={onNum} />
            {arr.map((btn) => (
                <span
                    onClick={(e) => onNum(e.target.innerText)}
                    className="btnNum"
                    key={btn}
                >
                    {btn}
                </span>
            ))}
            {children}
        </>
    );
};

export default App;
