const validator = require("xsd-schema-validator");
const fs = require("fs");
const path = require("path");
const { DOMParser, XMLSerializer } = require("@xmldom/xmldom");
// const XMLSerializer = require('xmlserializer');
const assert = require("assert");

const xsdPath = path.join(__dirname, "../specs/cdp-schema.xsd");
const xmlExamplePath = path.join(__dirname, "../examples/example-cdp.xml");

async function validateXMLString(xmlString, expectValid = true) {
  try {
    const result = await validator.validateXML(xmlString, xsdPath);
    if (expectValid) {
      assert.strictEqual(result.valid, true, "XML should be valid");
    } else {
      assert.strictEqual(result.valid, false, "XML should be invalid");
    }
  } catch (err) {
    console.dir(err, { depth: null });
    // console.error("Validation error:", Object.err);
    if (expectValid) {
      throw err; // Unexpected error, fail the test
    } else {
      assert.ok(err, "Expected validation error for invalid XML");
    }
  }
}

function removeElement(xmlString, tagName) {
  const doc = new DOMParser().parseFromString(xmlString, "application/xml");
  const elements = doc.getElementsByTagName(tagName);
  if (elements.length > 0) {
    const el = elements[0];
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
  return new XMLSerializer().serializeToString(doc);
}

function setElementValue(xmlString, tagName, value) {
  const doc = new DOMParser().parseFromString(xmlString, "application/xml");
  const elements = doc.getElementsByTagName(tagName);
  if (elements.length > 0) {
    elements[0].textContent = value;
  }
  return new XMLSerializer().serializeToString(doc);
}

function addElement(xmlString, tagName, value) {
  const doc = new DOMParser().parseFromString(xmlString, "application/xml");
  const root = doc.documentElement;
  const newEl = doc.createElement(tagName);
  newEl.textContent = value;
  root.appendChild(newEl);
  return new XMLSerializer().serializeToString(doc);
}

describe("CDP XML Schema Validation", () => {
  let xmlExample;

  beforeEach(() => {
    xmlExample = fs.readFileSync(xmlExamplePath, "utf8");
  });

  it("should validate a correct CDP XML example", async function () {
  const result = await validator.validateXML(xmlExample, xsdPath);
  assert.strictEqual(result.valid, true, "XML should be valid");
});
  it("should fail validation when required fields are missing", function () {
    const xmlMissingBody = removeElement(xmlExample, "body");
    return validateXMLString(xmlMissingBody, false);
  });

  it("should return validation errors when adding unsupported field", async function () {
    const invalidTag = "zod";
    const xmlInvalid = addElement(xmlExample, invalidTag, "foo bar");
    await assert.rejects(
      () => validator.validateXML(xmlInvalid, xsdPath),
      new RegExp(`Invalid content was found starting with element '${invalidTag}'`)
    );
  });

  it("should fail validation with additional properties", function () {
    const xmlWithExtra = addElement(xmlExample, "unexpectedField", "1");
    return validateXMLString(xmlWithExtra, false);
  });

  for (const tag of ["body", "signature", "publicKey"]) {
    it(`should fail validation when ${tag} is empty`, async function () {
      const xmlEmpty = setElementValue(xmlExample, tag, "");
       await assert.rejects(
        () => validator.validateXML(xmlEmpty, xsdPath),
        new RegExp(tag)
      );
    });
  }

  it("should validate when optional fields are omitted", function () {
    // Remove all optional fields (adjust tag names as needed)
    let xmlMinimal = xmlExample;
    xmlMinimal = removeElement(xmlMinimal, "tagline");
    xmlMinimal = removeElement(xmlMinimal, "hash");
    return validator.validateXML(xmlMinimal, xsdPath);
  });
});
