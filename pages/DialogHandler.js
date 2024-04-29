const { BaseActionPage } = require("./BaseActionPage")

exports.DialogHandler = class DialogHandler extends BaseActionPage {
    constructor(page) {
        super();
        this.page = page;
    }

    async navigateToPage() {
        await this.page.goto('https://testautomationpractice.blogspot.com/')
    }

    //print the page and show the photo in report
    async printPage() {
        //await this.page.pdf({ path: 'output.pdf' });
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }

    async pressAlertButton() {
        // Click the button that triggers the alert
        await this.page.click('//button[contains(text(),"Alert")]');
    }
    async handlingALert() {
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            this.printPage();
            dialog.dismiss().catch(() => { });
            // this.printPage();
        });
        //this.printPage();
        await this.page.click('//button[contains(text(),"Alert")]');
    }


}