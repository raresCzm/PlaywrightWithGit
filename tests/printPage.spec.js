import { test, expect } from "@playwright/test"
import { DialogHandler } from '../pages/DialogHandler'

test('PrintPage Test', async ({ page }) => {
    const dialogHandler = new DialogHandler(page);

    //navigate to the page
    await dialogHandler.navigateToPage();

    //await page.pause();

    //print page
    //printPage.printPage();

    //await printPage.pressAlertButton()

    //await page.pause();

    await dialogHandler.handlingALert();

    //await page.pause();

});