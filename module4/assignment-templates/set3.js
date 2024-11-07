/**
 * Set 3
 *
 * This assignment will develop your ability to manipulate data.
 * You should be ready for JS tutorials on more advanced topics after this.
 *
 * Please refer to the `module4/sample-data/set3-sample-data.js` file for examples of:
 * - the `socialGraph` parameter for `relationshipStatus`
 * - the `board` parameter for `ticTacToe`
 * - the `routeMap` parameter for `eta`
 */

/**
 * Relationship status
 *
 * Let's pretend that you are building a new app with social media functionality.
 * Users can have relationships with other users.
 *
 * The two guidelines for describing relationships are:
 * 1. Any user can follow any other user.
 * 2. If two users follow each other, they are considered friends.
 *
 * This function describes the relationship that two users have with each other.
 *
 * Please see the sample data for examples of `socialGraph`.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */
function relationshipStatus(fromMember, toMember, socialGraph) {
        const fromFollowsTo = socialGraph[fromMember].following.includes(toMember);
        const toFollowsFrom = socialGraph[toMember].following.includes(fromMember);
    
        if (fromFollowsTo && toFollowsFrom) {
            return "friends";
        } else if (fromFollowsTo) {
            return "follower";
        } else if (toFollowsFrom) {
            return "followed by";
        } else {
            return "no relationship";
        }
    }
    

/**
 * Tic tac toe
 *
 * Tic Tac Toe is a common paper-and-pencil game.
 * Players must attempt to draw a line of their symbol across a grid.
 * The player that does this first is considered the winner.
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * Please see the sample data for examples of `board`.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays. The size of the array will range between 3x3 to 6x6.
 * The board will never have more than 1 winner.
 * There will only ever be 2 unique symbols at the same time.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */
function ticTacToe(board) {
        const n = board.length;
        
        function allSame(arr) {
            return arr.every(cell => cell === arr[0] && cell !== null && cell !== '');
        }
        
        for (let i = 0; i < n; i++) {
            if (allSame(board[i])) return board[i][0];
            
            const col = board.map(row => row[i]);
            if (allSame(col)) return col[0];
        }
        
        const mainDiagonal = Array.from({ length: n }, (_, i) => board[i][i]);
        if (allSame(mainDiagonal)) return mainDiagonal[0];
        
        const antiDiagonal = Array.from({ length: n }, (_, i) => board[i][n - 1 - i]);
        if (allSame(antiDiagonal)) return antiDiagonal[0];
        
        return "NO WINNER";
    }

/**
 * ETA
 *
 * A shuttle van service is tasked to travel one way along a predefined circular route.
 * The route is divided into several legs between stops.
 * The route is fully connected to itself.
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving anothe rstop.
 *
 * Please see the sample data for examples of `routeMap`.
 *
 * @param {string} firstStop the stop that the shuttle will leave
 * @param {string} secondStop the stop that the shuttle will arrive at
 * @param {object} routeMap the data describing the routes
 * @returns {Number} the time that it will take the shuttle to travel from firstStop to secondStop
 */
function eta(firstStop, secondStop, routeMap) {
        let totalTime = 0;
        let currentStop = firstStop;
    
        while (currentStop !== secondStop) {
            const nextLeg = Object.keys(routeMap).find(route => route.startsWith(currentStop + ','));
            
            if (!nextLeg) {
                throw new Error(`No route found starting from ${currentStop}`);
            }
    
            totalTime += routeMap[nextLeg].travel_time_mins;
            
            currentStop = nextLeg.split(',')[1];
        }
    
        return totalTime;
    }

