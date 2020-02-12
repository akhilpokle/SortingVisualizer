import React from 'react'

export const Slider = (props) => {
    return (
        <div>
            <input type="range" min="10" max="300" value="150" class="slider" id="myRange" orient="vertical" onInput={props.changeHandler} />
        </div>
    )
}
