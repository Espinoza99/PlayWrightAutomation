const {test, expect, request } = require("@playwright/test");
const {ApiUtils} = require("./utils/ApiUtils");
const loginPayload = {userEmail:"anshika@gmail.com", usePassword:"Iamking@000"};
const orderPayload = {orders:[{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};

let token;
let orderId;


let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload)
}
    );

    test('Client App login',async ({page})=>
    {   
        
        page.addInitScript(value => {
            window.localStorage.setItem("token",value);
        },response.token);


        //js file- Login js, DashboardPage

        await page.goto("https://rahulshettyacademy.com/client/");
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");
    
        for(let i =0; i<await rows.count(); ++i)
     {
        const rowOrderId =await rows.nth(i).locator("th").textContent();
        if (response.token.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
     }
        const orderIdDetails =await page.locator(".col-text").textContent();
        await page.pause();
        expect(response.token.includes(orderIdDetails)).toBeTruthy();
    
    
    
    
    
    
        // Zaracoat3
    });

