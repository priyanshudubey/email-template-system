const mustache = require("mustache");
const readlineSync = require("readline-sync");

const template = `
  Hi {{{Receipient_Name}}},

  {{#WellNess}}
  blah blash blah
  {{/WellNess}}

  {{#ImportantMessage}}
  Just wanted to let you know that your classes are starting from {{{Start_Date}}}, and I want you to be present in the class.
  {{/ImportantMessage}}

  {{#Signature}}
  Regards,
  Priyanshu
  {{/Signature}}
`;

const data = {
  WellNess: true,
  ImportantMessage: true,
  Signature: true,
  Receipient_Name: "",
  Start_Date: "",
};

// Function to prompt the user for a placeholder value
function promptForPlaceholder(placeholderName) {
  const placeholderValue = readlineSync.question(
    `Do you need to replace the ${placeholderName} placeholder? (Yes/No): `
  );
  if (placeholderValue.toLowerCase() === "yes") {
    const newPlaceholderValue = readlineSync.question(
      `Please enter the new value for ${placeholderName}: `
    );
    data[placeholderName] = newPlaceholderValue;
  }
}

// Find and prompt for all placeholders
const placeholderRegex = /{{{(.+?)}}}/g;
const matches = [...template.matchAll(placeholderRegex)];

// Iterate over matches and prompt for values
for (const match of matches) {
  const placeholderName = match[1];
  if (data.hasOwnProperty(placeholderName)) {
    promptForPlaceholder(placeholderName);
  }
}

// Render the template with the updated data
const parsedTemplate = mustache.render(template, data);
console.log(parsedTemplate);
