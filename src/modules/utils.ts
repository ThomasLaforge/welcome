export function numberArray_split(arr: number[], spacer: number){
    let indices = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === spacer) {
            indices.push(i)
        }
    }

    let indexStart = 0
    let splits = indices.map( indexEnd => {
        let split = arr.slice(indexStart, indexEnd)
        indexStart = indexEnd + 1 
        return split
    })
    splits.push(arr.slice(indexStart, arr.length))    
    return splits
}