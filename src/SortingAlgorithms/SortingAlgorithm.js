export function getQuickSortAnimations2(array){
  let animation = [];
  quickSort2(array,0,array.length-1,animation);
  return animation;
}

function quickSort2(array,left,right,animation){
  let index;
  if(array.length>1){
    index = partition2(array,left,right,animation);
    if(left<index-1){
      quickSort2(array,left,index-1,animation);
    }
    if(index<right){
      quickSort2(array,index,right,animation);
    }
  }
  return array;
}

function partition2(array,left,right,animation){
  let pivot =array[Math.floor((right+left)/2)];
  let pivotIdx = Math.floor((right+left)/2);
  let i = left;
  let j = right;
  animation.push({idx:pivotIdx,height:pivot,color:'#ee4540'});
  while(i<=j){
    while(array[i] < pivot){
      animation.push({idx:i,height:array[i],color:'#2d132c'});
      i++;
    }
    while(array[j]>pivot){
      animation.push({idx:j,height:array[j],color:'#2d132c'});
      j--;
    }
    if(i<=j){
      let a = array[i];
      let b = array[j];
      animation.push({idx:i,height:b,color:'#2d132c'});
      animation.push({idx:j,height:a,color:'#2d132c'});
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}

export function getInsetionSortAnimations(array){
  let animation = [];
  insertionSort(array,animation);
  return animation;
}

function insertionSort(arr,animation){
  let n = arr.length;
  for(let i=1;i<n;i++){
    let key = arr[i];
    animation.push({type:"pivot",idx:i,value:key,color:"orange"});
    let j= i -1;
    while(j>=0 && arr[j] > key){
      animation.push({type:"swap",idx:j+1,value:arr[j],color:"purple"});
      animation.push({type:"swap",idx:j,value:key,color:"purple"});
        
      arr[j+1] = arr[j];
      j = j-1;
    }
    animation.push({type:"swap",idx:j+1,value:key,color:"yellow"});
    arr[j+1] = key;
  }
}

export function getQuickSortAnimations(array){
  let animation = [];
  quickSort(array,0,array.length-1,animation);
  return animation;
}

function quickSort(array,left,right,animation){
  let index;
  if(array.length>1){
    index = partition(array,left,right,animation);
    if(left<index-1){
      quickSort(array,left,index-1,animation);
    }
    if(index<right){
      quickSort(array,index,right,animation);
    }
  }
  return array;
}

function partition(array,left,right,animation){
  let pivot =array[Math.floor((right+left)/2)];
  let pivotIdx = Math.floor((right+left)/2);
  let i = left;
  let j = right;
  animation.push({type:'pivot',idx:pivotIdx,color:'yellow'});
  while(i<=j){
    while(array[i] < pivot){
      animation.push({type:'curr',idx:i,color:'red'});
      animation.push({type:'prev',idx:i,color:'red'});
      i++;
    }
    animation.push({type:'swap',idx:i,color:'red'});
    while(array[j]>pivot){
      animation.push({type:'curr',idx:j,color:'red'});
      animation.push({type:'prev',idx:j,color:'red'});
      j--;
    }
    animation.push({type:'swap',idx:i,color:'red'});
    if(i<=j){
      let a = array[i];
      let b = array[j];
      animation.push({type:'fswap',idx:i,height:b,color:'yellow'});
      animation.push({type:'fswap',idx:j,height:a,color:'yellow'});
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
  }
  animation.push({type:'wipe',color:'turquoise'});
  return i;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  let n = array.length;
  for(let i=0;i<n-1;i++){
    for(let j=0;j<n-i-1;j++){
      if(array[j]>array[j+1]){
        animations.push({type:"swap",idx:j+1,value:array[j],color:"purple"});
        animations.push({type:"swap",idx:j,value:array[j+1],color:"purple"});
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }   
  }
  return animations;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
