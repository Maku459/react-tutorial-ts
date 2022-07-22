import React from "react";

type Props = {
    value: Array<number>[number]
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