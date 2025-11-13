const grid = [
  [1,1,0,1,1],
  [1,0,0,0,0],
  [0,0,0,1,1],
  [1,1,0,1,0],
];


function findthepair(grid, row, col, visited, result) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < directions.length; i++) {
    const [dr, dc] = directions[i];
    const nr = row + dr;
    const nc = col + dc;
    const maxR = grid.length;
    const maxC = grid[0].length;
    if (nr >= 0 && nc >= 0 && nr < maxR && nc < maxC && grid[nr][nc] === 1 && !visited[nr][nc]) {
      visited[nr][nc] = 1;
      result.push([nr, nc]);
      findthepair(grid, nr, nc, visited, result);
    }
  }
}

function findOne(grid ,row , col ,  visited , result){
    if(visited[row][col]!==1){
        findthepair(grid ,row , col ,  visited , result)

    }
}
function main(){

    let row = grid.length;
    let col = grid[0].length;
    let ans = []
    let visited = Array.from({ length: row }, () => Array(col).fill(0));
  
    for(let i = 0 ; i<row ;i++){
        for(let j = 0 ;j<col ;j++){
            let result = []
            let current = grid[i][j];
            if(current===1){
                findOne(grid, i , j ,  visited, result)  
                if(result.length!==0){
                    ans.push(result)
                }
            }
           
        }
    }
    console.log(ans)
    let ans_correct = new Set()
    for(let i = 0 ;i<ans.length;i++){
        let ansdata = []
        for(let j = 0;j<ans[i].length;j++){
            let[ row , col] = ans[i][0];
            let [grid_row, grid_col] =ans[i][j]
            let row_correct =grid_row -row ;
            let correct_col = grid_col -col
            let shape = [row_correct,correct_col ]
            ansdata.push(shape)
        }
        ans_correct.add(JSON.stringify(ansdata))
    }
    console.log(ans_correct,'sdkvjnvskds')
}

main()