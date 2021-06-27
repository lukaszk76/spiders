const equations = {}    //will contain factors of mathematical functions describing lines btween spiders {{a:number,b:number,c:number}, ...}

// calculates mathematical linear function passing through 2 points (x1,y1) and (x2,y2)
// params:
//  x1: number - x coordinate of point 1
//  y1: number - y coordinate of point 1
//  x2: number - x coordinate of point 2
//  y2: number - y coordinate of point 2
// return:
//  {a: number, b: number, c: number} - an object containg factors of a function ax + by = c which passes through (x1, y1) and (x2, y2) 
const factors = ( x1, y1, x2, y2 ) =>
{
    const a = -1 * (y2 - y1) / (x2 - x1);
    const b = 1;
    const c = a * x1 + y1
    return {
        a: a,
        b: b,
        c: c
    }
}

// checks if 2 lines cross in the expected area
// params:
//  equation1: {a,b,c} - factors describing a linear function representing the 1st line between 2 spiders
//  equation2: {a,b,c} - factors describing a linear function representing the 2nd line between 2 spiders
//  delta: number - correction factor to be added to coordinates so that size of a spider is considerd (equal to half of spider's size)
//  spiders {spiderId:{x:number,y:number},...} - an object containing coordiantes of all spiders
//  spider1: number - ID of a spider at 1st ending of line 1
//  spider2: number - ID of a spider at 2st ending of line 1
//  spider3: number - ID of a spider at 1st ending of line 2
//  spider4: number - ID of a spider at 2st ending of line 2
// return:
//  {x: number, y: number} - an object containing coordinates of a point where lines are crossed
//  false - if lines do not cross
const checkIfCrossed = (equation1, equation2, delta, spiders, spider1, spider2, spider3, spider4) => {
    
    const W = (equation1.a * equation2.b) - (equation2.a * equation1.b);
    const Wx = (equation1.c * equation2.b) - (equation2.c * equation1.b);
    const Wy = (equation1.a * equation2.c) - (equation2.a * equation1.c);

    if (W !== 0) {
         
        const x = Wx / W;   // lines are crossing in (x,y)
        const y = Wy / W;
       
        // check if they are crossing between spiders and not on extenions of lines (not the case we need)
        if (                
            x > Math.min( spiders[spider1].x + delta, spiders[spider2].x + delta ) &
            x < Math.max( spiders[spider1].x + delta, spiders[spider2].x + delta) &
            x > Math.min( spiders[spider3].x + delta, spiders[spider4].x + delta) &
            x < Math.max( spiders[spider3].x + delta, spiders[spider4].x + delta) &
            y > Math.min( spiders[spider1].y + delta, spiders[spider2].y + delta) &
            y < Math.max( spiders[spider1].y + delta, spiders[spider2].y + delta) &
            y > Math.min( spiders[spider3].y + delta, spiders[spider4].y + delta) &
            y < Math.max( spiders[spider3].y + delta, spiders[spider4].y + delta) 
        ) { 
            return {x: x, y: y};   
        }
    }  
    return false
}

// checks all lines if some of them are crossing
// params:
//  spiders {spiderId:{x:number,y:number},...} - an object containing coordiantes of all spiders
//  lines {lineId:{from:number,to:number},...} - an object containing information about lines connecting spiders (from and to are spider's IDs)
// return:
//  [{number:true,...}, {number:{x:number, y:number}}] - data structure containing information about lines which are crossed {lineId1: true, lineId2: true,...} and coordinates of points where lines are crosed {pointId1: {x,y}, pointId2: {x,y}}
const checkIfSolved = ( spiders, lines, size ) => {

    const delta = size / 2 // this needs to be added to all coordinates because lines start at spider's center and not left top corner

    Object              // iterate for all lines
        .keys(lines)
        .map( lineId => {
            const spider1 = lines[lineId].from; // select both spiders at the line end
            const spider2 = lines[lineId].to;
            equations[lineId] = factors (       // calculate factors of equation ax + by = c from coordinates x,y of spiders at line ends and store it equations
                spiders[spider1].x + delta,
                spiders[spider1].y + delta,
                spiders[spider2].x + delta,
                spiders[spider2].y + delta
            )
        }
    )

    const linesCrossed = {};    //this will contain id of lines which cross with other ones
    const crossedPoints = {};   //this will contain coordinates of all points where lines are crossed
    Object
        .keys(lines)            // for each line check if it crosses with some other line
        .map( lineId1 => {
            Object
                .keys(lines)
                .map( lineId2 => {
                    const spider1 = lines[lineId1].from;    // select all 4 spiders at both lines ends
                    const spider2 = lines[lineId1].to;
                    const spider3 = lines[lineId2].from;
                    const spider4 = lines[lineId2].to;

                    if (lineId1 !== lineId2 &   //do not check if a line crosses with itself
                        spider1 !== spider3 &   //do not check if both lines starts from the same spider
                        spider1 !== spider4 &
                        spider2 !== spider3 &
                        spider2 !== spider4) 
                        {
                            const crossPoint = checkIfCrossed( //check if these 2 lines crosses between spiders
                                equations[lineId1], 
                                equations[lineId2], 
                                delta,
                                spiders, 
                                spider1, 
                                spider2, 
                                spider3, 
                                spider4);

                             if ( crossPoint ) {
                                     linesCrossed[lineId1] = true;
                                     crossedPoints[lineId1] = crossPoint;
                                 }; 
                                
                        }
                })
        })
    return [linesCrossed, crossedPoints];
}

export default checkIfSolved;