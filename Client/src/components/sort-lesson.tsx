import '../css/sort-lesson.css';
// import bubbleSort from '../utils/'

export default function SortLesson () {

  // Should store all the text/arrays in the db and just reuse this component for every lesson
  // But we'll just write everything here for now
  // Took the info from geeksforgeeks.com

  let tempArr = [5, 1, 4, 2, 8];

  let paragraphs = {sortName: 'Bubble sort', firstP: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.', secondP: 'First Pass: Bubble sort starts with very first two elements, comparing them to check which one is greater.'};

  // Write a nice view for the columns in the array

  // Animation to swap them

  // let style = {
  //   'backgroundColor': 'green',
  //   'height': `${tempArr[0]}0px`
  // }
  // let style2 = {
  //   'backgroundColor': 'green',
  //   'height': `${tempArr[1]}0px`
  // }

  const allNums = tempArr.map((num) => {
    return (
      {
        'backgroundColor': 'green',
        'height': `${num}0px`
      }
    )
  })

  console.log(allNums);



  return (
    <>
    <div className='whole-page-wrapper'>
      <div className='lesson-wrapper'>
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
        <div className='array'>
          <h2>{tempArr}</h2>
          {/* <div className='array-el' style={style}></div>
          <div className='array-el' style={style2}></div> */}
          {allNums.map((style) => <div className='array-el' style={style}></div>)}
        </div>
      </div>
    </div>
    </>
  );
}
