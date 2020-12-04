"use strict";

const { Builder, By, Key, until } = require("selenium-webdriver");

async function checkGoogleSearchTitle(driver) {
  try {
    await driver.get("http://www.google.com");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.ENTER);
    await driver.wait(until.titleContains("webdriver Google"), 1000);
    console.log("Success!");
  } catch (err) {
    console.error("Something went wrong!\n", err.stack, "\n");
  } finally {
    await driver.quit();
  }
}

function createDriver(name) {
  return new Builder().forBrowser(name).build();
}

Promise.all([
  checkGoogleSearchTitle(createDriver("firefox")),
  checkGoogleSearchTitle(createDriver("chrome")),
])
  .then((_) => {
    console.log("All done!");
  })
  .catch(console.error);
