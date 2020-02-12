import React from 'react';
import {getBubbleSortAnimations,getMergeSortAnimations, getQuickSortAnimations2,getQuickSortAnimations,getInsetionSortAnimations} from '../SortingAlgorithms/SortingAlgorithm';
import './SortingVisualizer.css';
import {DebounceInput} from 'react-debounce-input';
const ANIMATION_SPEED_MS = 50;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
let max ;
let width ;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      ANIMATION_SPEED_MS:25,
      value:150,
      disabled:false
    };
  }

  componentDidMount() {
    max = document.getElementById('array-container').clientHeight;
    width = document.getElementById('array-container').clientWidth/this.state.value;
    this.resetArray(max,width);
  }

  changeHandler = (e) => {
    this.setState({value:e.target.value});
    console.log("seconds"+e.target.value);
    this.changeSpeed();
    //max = document.getElementById('array-container').clientHeight;
    width = Math.floor(document.getElementById('array-container').clientWidth/this.state.value);
    console.log("width = "  +width);
    this.resetArray(max,width);
  }

  changeSpeed = () =>{
    let newSec = 0;
    let seconds = this.state.value;
    console.log("seconds1"+seconds);
    if(seconds >=10 && seconds <30)  newSec = 50;
    if(seconds >=30 && seconds <60)  newSec = 45;
    if(seconds >=60 && seconds <90)  newSec = 40;
    if(seconds >=90 && seconds <120)  newSec = 35;
    if(seconds >=120 && seconds <150)  newSec = 30;
    if(seconds >=150 && seconds <180)  newSec = 5;
    if(seconds >=180 && seconds <210)  newSec = 20;
    if(seconds >=210 && seconds <240)  newSec = 15;
    if(seconds >=240 && seconds <270)  newSec = 10;
    if(seconds >=270)  newSec = 5;
    this.setState({ANIMATION_SPEED_MS:newSec});
    console.log(this.state.ANIMATION_SPEED_MS);
  }

  checker = () =>{
    console.log("checker");
    let array = document.getElementsByClassName("array-bar");
    for(let i=1;i<array.length;i++){
      setTimeout(()=>{
        if(array[i].style.height>=array[i-1].style.height){
          array[i-1].style.backgroundColor = "turquoise";
        }
      },i*6);
    }
    setTimeout(()=>{array[array.length-1].style.backgroundColor = "turquoise";},array.length*4);
    setTimeout(()=>{
      let arr = this.state.array;
      arr = arr.sort((a,b)=>a-b);
      console.log(arr);
      this.setState({array:arr});
    },array.length*6) 
  }

  resetTimer = () => {
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }

  resetArray = (max,width) =>{
    const array = [];

    for (let i = 1; i < this.state.value; i++) {
      array.push(randomIntFromInterval(10,max));
    }
    this.setState({array});
    this.changeSpeed();
  }

  countUp(millseconds){
    let min = "00";
    let sec = "01";
    let timer = 1;
    let mill = 0;
    millseconds = Math.floor(millseconds/1000);
    document.getElementById("minutes").textContent = min;
    document.getElementById("seconds").textContent = sec;
    let id = setInterval(() => { 
      min = parseInt(timer/60,10);
      sec = parseInt(timer%60,10);
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      document.getElementById("minutes").textContent = min;
      document.getElementById("seconds").textContent = sec;
      timer++;
      mill++;
      console.log("mill"+mill+"timer"+timer);
      if(mill > millseconds){
        clearInterval(id);
        console.log(mill);
        this.setState({disabled:false});
      }
    }, 1000);
  }

  mergeSort() {
    this.resetTimer();
    let array = this.state.array.slice();
    const animations = getMergeSortAnimations(array);
    console.log(this.state.array);
    this.setState({disabled:true});
    this.countUp((animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "green";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i+i) * this.state.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, (i+i) * this.state.ANIMATION_SPEED_MS);
      }
    }
    console.log("animation"+(animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
    setTimeout(()=>{
      this.checker();
    },(animations.length+animations.length+10)*this.state.ANIMATION_SPEED_MS);
  }
  
  bubbleSort() {
    this.setState({disabled:true});
    this.resetTimer();
    let array = this.state.array.slice();
    const animations = getBubbleSortAnimations(array);
    const arrayBars = document.getElementsByClassName('array-bar');
    this.countUp((animations.length+animations.length-2)*this.state.ANIMATION_SPEED_MS);
    for(let i=0;i<animations.length;i++){
      setTimeout(()=>{
        arrayBars[animations[i].idx].style.backgroundColor = animations[i].color;
        arrayBars[animations[i].idx].style.height = `${animations[i].value}px`;
      },(i+i)*this.state.ANIMATION_SPEED_MS);
    }
    console.log((animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
    setTimeout(()=>{
      this.checker();
    },(animations.length+animations.length+10)*this.state.ANIMATION_SPEED_MS);
  }

  insertionSort() {
    this.setState({disabled:true});
    this.resetTimer();
    let array = this.state.array.slice();
    const animations = getInsetionSortAnimations(array);
    console.log(animations);
    this.countUp((animations.length+animations.length-2)*this.state.ANIMATION_SPEED_MS);
      const arrayBars = document.getElementsByClassName('array-bar');
      for(let i=0;i<animations.length;i++){
        setTimeout(() => {
         arrayBars[animations[i].idx].style.backgroundColor = animations[i].color; 
         arrayBars[animations[i].idx].style.height = `${animations[i].value}px`;
        },(i+i)*this.state.ANIMATION_SPEED_MS); 
      }
      console.log((animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
      setTimeout(()=>{
        this.checker();
      },(animations.length+animations.length+10)*this.state.ANIMATION_SPEED_MS);
  }

  quickSort() {
    this.setState({disabled:true});
    this.resetTimer();
    let array = this.state.array.slice();
    const animations = getQuickSortAnimations2(array);
    this.countUp((animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let i=0;i<animations.length;i++){
      setTimeout(() => {
       arrayBars[animations[i].idx].style.backgroundColor = animations[i].color; 
       arrayBars[animations[i].idx].style.height = `${animations[i].height}px`;
      },(i+i)*this.state.ANIMATION_SPEED_MS); 
    }
    //old code
    // const animations = getQuickSortAnimations(array);
    // this.countUp((animations.length+animations.length-2)*this.state.ANIMATION_SPEED_MS);
    // for(let i=0;i<animations.length;i++){
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //   if(animations[i].type === "pivot"){
    //     console.log(animations[i].idx);
    //     setTimeout(()=>{
    //     arrayBars[animations[i].idx].style.backgroundColor = animations[i].color;
    //   },(i+i)*this.state.ANIMATION_SPEED_MS);
    // }
    //   if(animations[i].type === "curr"){
    //     setTimeout(()=>{
    //       arrayBars[animations[i].idx].style.backgroundColor = animations[i].color;
    //     },(i+i)*this.state.ANIMATION_SPEED_MS);
    //   }
    //   if(animations[i].type === " prev"){
    //     setTimeout(()=>{
    //       arrayBars[animations[i].idx].style.backgroundColor = animations[i].color;
    //     },(i+i)*this.state.ANIMATION_SPEED_MS);
    //   }
    //   if(animations[i].type === "swap"){
    //     setTimeout(()=>{
    //       arrayBars[animations[i].idx].style.backgroundColor = animations[i].color;
    //     },(i+i)*this.state.ANIMATION_SPEED_MS);
    //   }
    //   if(animations[i].type === "fswap"){
    //     setTimeout(()=>{
    //       arrayBars[animations[i].idx].style.backgroundColor = animations[i].color;
    //       arrayBars[animations[i].idx].style.height = `${animations[i].height}px`;
    //     },(i+i)*this.state.ANIMATION_SPEED_MS);
    //   }
    //   if(animations[i].type === "wipe"){
    //     setTimeout(()=>{
    //       const arrayBar = document.getElementsByClassName('array-bar');
    //       for(let i=0;i<arrayBar.length;i++){
    //         arrayBar[i].style.backgroundColor = animations[i].color;
    //       }
    //     },(i+i)*this.state.ANIMATION_SPEED_MS);
    //   }
    // }
    // console.log((animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
    setTimeout(()=>this.checker(),(animations.length+animations.length)*this.state.ANIMATION_SPEED_MS);
}

  render() {
    const {array} = this.state;
    console.log("rendering");
    return (
      <div id="container" className="container">
        <div className="buttoncontianer">
        <button id="btn-1" onClick={() => this.resetArray(max,width)} disabled = {this.state.disabled}>Generate New Array</button>
        <button id="btn-2" onClick={() => this.mergeSort()} disabled = {this.state.disabled}>Merge Sort</button>
        <button id="btn-3" onClick={() => this.quickSort()} disabled = {this.state.disabled}>Quick Sort</button>
        <button id="btn-4" onClick={() => this.insertionSort()} disabled = {this.state.disabled}>Insertion Sort</button>
        <button id="btn-5" onClick={() => this.bubbleSort()} disabled = {this.state.disabled}>Bubble Sort</button>
        </div>
        <div id="array-container" className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: "turquoise",
                  height: `${value}px`, 
                  width:`${width-1}px`
                }}></div>
            ))}
        </div>
        <div className = "timeContainer">
          <div><h1>Time</h1></div>
          <h1><span id="minutes">00</span>:<span id="seconds">00</span></h1>
        </div>
        <div className = "silderContainer">
          <DebounceInput minLength = {2} debounceTimeout={30} type="range" min="10" max="300" value={this.state.value} className="slider" id="myRange" orient="vertical" disabled = {this.state.disabled} onChange={this.changeHandler} />
                <p>Use Slider to Increase/Decrease number of elements and speed</p>
        </div>
      </div>
    );
  }
}


function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}