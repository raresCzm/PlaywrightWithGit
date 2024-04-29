import { test } from "@playwright/test";
import { TricentisObstacles } from '../pages/TricentisObstacles';

async function navigateToObstacle(obstacleNumber, page) {

    const tricentisObstacles = new TricentisObstacles(page);

    await tricentisObstacles.goToObstacleListPage();
    await tricentisObstacles.searchObstacle(obstacleNumber);
    //await page.pause();

}

// Define tests
// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 72954 ", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('72954', page);
//         await tricentisObstacles.solveObstacle72954();
//         //await page.pause();
//     });
// });

// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 22505", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('22505', page);
//         await tricentisObstacles.solveObstacle22505();
//     });
// });


// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 64161", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('64161', page);
//         await tricentisObstacles.solveObstacle64161();
//     });
// });


// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 92248", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('92248', page);
//         await tricentisObstacles.solveObstacle92248();
//     });
// });

// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 94441", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('94441', page);
//         await tricentisObstacles.solveObstacle94441();
//     });
// });

// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 24499", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('24499', page);
//         await tricentisObstacles.solveObstacle24499();
//     });
// });

// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 60469->Toscabot can fly!", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('60469', page);
//         await tricentisObstacles.solveObstacle60469();
//     });
// });

// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 23292->Drag and Drop elements from a table to another!", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('23292', page);
//         await tricentisObstacles.solveObstacle23292();
//     });
// });

// test.describe("Obstacle challenge", () => {
//     test("Solve obstacle 99999-> Drag and Drop elements from a table to another!", async ({ page }) => {
//         const tricentisObstacles = new TricentisObstacles(page);
//         await navigateToObstacle('99999', page);
//         await tricentisObstacles.solveObstacle99999();
//     });
// });

test.describe("Obstacle challenge", () => {
    test("Solve obstacle 21269-> Christmas day for actual year", async ({ page }) => {
        const tricentisObstacles = new TricentisObstacles(page);
        await navigateToObstacle('21269', page);
        await tricentisObstacles.solveObstacle21269(2);
    });
});