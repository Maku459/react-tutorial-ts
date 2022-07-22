import React from "react";

type oneSquareType = "X" | "O" | null;

type Props = {
    value: Array<oneSquareType>[number]
    onClick: () => void
}

const Square = (props: Props) => {
    return (
        <button
            className="square"
            onClick = {props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;