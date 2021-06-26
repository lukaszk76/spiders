const equations = {}

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

const checkIfCrossed = (equation1, equation2, spiders, spider1, spider2, spider3, spider4) => {
    const W = (equation1.a * equation2.b) - (equation2.a * equation1.b);
    const Wx = (equation1.c * equation2.b) - (equation2.c * equation1.b);
    const Wy = (equation1.a * equation2.c) - (equation2.a * equation1.c);

    const minX = Math.min( spiders[spider1].x, spiders[spider2].x, spiders[spider3].x, spiders[spider4].x ) //select max and min coordinates of all spiders to define the are where lines may cross
    const maxX = Math.max( spiders[spider1].x, spiders[spider2].x, spiders[spider3].x, spiders[spider4].x )
    const minY = Math.min( spiders[spider1].y, spiders[spider2].y, spiders[spider3].y, spiders[spider4].y )
    const maxY = Math.max( spiders[spider1].y, spiders[spider2].y, spiders[spider3].y, spiders[spider4].y )

    if (W === 0) {
        return false; // lines are parallel - no crossing
    } else {
        const x = Wx / W;   // lines are crossing in (x,y)
        const y = Wy / W;
        if (                // check if they are crossing between spiders or on extenions of lines (not the case we need)
            x > minX &
            x < maxY &
            y > minY &
            y < maxY
        ) { 
            return true;   
        } 
    }
    return false
}

const checkIfSolved = ( spiders, lines ) => {

    // checks all lines if some of them are crossing

    Object              // iterate for all lines
        .keys(lines)
        .map( lineId => {
            const spider1 = lines[lineId].from; // select both spiders at the line end
            const spider2 = lines[lineId].to;
            equations[lineId] = factors (       // calculate equation ax + by = c from coordinates x,y of spiders at line ends and store it equations
                spiders[spider1].x,
                spiders[spider1].y,
                spiders[spider2].x,
                spiders[spider2].y
            )
        }
    )

    Object
        .keys(lines)
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
                            checkIfCrossed(equations[lineId1], equations[lineId2], spiders, spider1, spider2, spider3, spider4); //check if these 2 lines crosses between spiders
                        }
                })
        })

}

export default checkIfSolved;