const Profile = require('../models/Profile')
const { Builder, By, Key, until, Browser } = require('selenium-webdriver')

selectors = {
  author: [
    "input[type='text'][name*='author' i]",
    "input[type='text'][name*='name' i]",
    "input[name*='name' i]",
    "input[id*='name' i]",
    "input[type='text']",
  ],
  email: [
    "input[type='text'][name*='mail' i]",
    "input[name*='mail' i]",
    "input[id*='mail' i]",
    "input[type='email']",
  ],
  phone: [
    "input[type='number'][name*='phone' i]",
    "input[name*='phone' i]",
    "input[type='number']",
  ],
  website: [
    "input[type='text'][name*='url' i]",
    "input[name*='url' i]",
    "input[type='text']",
  ],
  comment: [
    "textarea[name*='comment' i]",
    "input[type='text'][name*='comment' i]",
    "input[name*='comment' i]",
    'textarea',
    "input[type='text']",
  ],
  submit: [
    "input[type='submit'][name*='submit' i]",
    "input[type='submit']",
    "input[name*='submit' i]",
    'span',
  ],
}

async function findElementBySelector(driver, selectors) {
  for (let selector of selectors) {
    try {
      let element = await driver.findElement(By.css(selector))
      if (element && (await element.isDisplayed) && (await element.isEnabled)) {
        return element
      }
    } catch (err) {
      console.log('cant find element ' + err.message + ' selectors ' + selector)
    }
  }
  return null
}

async function check_comment_posted(driver, url, comment_text) {
  try {
    console.log(url)

    await driver.get(url)

    await driver.navigate().refresh()

    console.log('Page reload success fully')
    const page_source = await driver.executeScript(
      'return document.documentElement.outerHTML;'
    )

    // # print("page source ", page_source)
    // # Check if the comment text is present in the comment section
    // console.log("page source " + page_source);
    if (page_source.includes(comment_text)) {
      console.log('Comment successfully posted ' + comment_text)
      return true
    } else {
      console.log('Comment not found.')
      return false
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports.postComment = async function (postId, urls) {
  let driver = new Builder().forBrowser(Browser.CHROME).build()

  try {
    dataResp = await Profile.findById(postId)
    const { name, phone, email, website, comment } = dataResp
    let result = []

    for (let url of urls) {
      try {
        await driver.get(url)
        await driver.wait(driver, 2000)

        try {
          let nameField = await findElementBySelector(
            driver,
            selectors['author']
          )
          let emailField = await findElementBySelector(
            driver,
            selectors['email']
          )
          let phoneField = await findElementBySelector(
            driver,
            selectors['phone']
          )
          let websiteField = await findElementBySelector(
            driver,
            selectors['website']
          )
          let commentField = await findElementBySelector(
            driver,
            selectors['comment']
          )
          let submitButton = await findElementBySelector(
            driver,
            selectors['submit']
          )

          if (
            !nameField &&
            !emailField &&
            !phoneField &&
            !websiteField &&
            !commentField &&
            !submitButton
          ) {
            result.push({ [url]: 'Failed' })
            console.log('cant find anything')
            continue
          } else {
            if (nameField) {
              await nameField.sendKeys(name)
            }
            if (emailField) {
              await emailField.sendKeys(email)
            }
            if (phoneField) {
              await phoneField.sendKeys(phone)
            }
            if (websiteField) {
              await websiteField.sendKeys(website)
            }
            if (commentField) {
              await commentField.sendKeys(comment)
            }

            if (submitButton) {
              console.log('submit')
              await submitButton.click()
            }
          }
        } catch (err) {
          console.log('[LOG]: ', err.message)
        }
      } catch (err) {
        console.log('[LOG]: ', err.message)
      }
      if (await check_comment_posted(driver, url, comment)) {
        result.push([url, 'Success'])
      } else {
        result.push([url, 'Failed'])
      }
    }
    // console.log(result)
    const count = result.filter((item) => {
      return item[1] === 'Success'
    }).length
    // console.log(result, count)
    return { result, count }
  } catch (err) {
    console.log('Unexpected error: ' + '[LOG]: ', err.message)
  } finally {
    await driver.quit()
  }
}
