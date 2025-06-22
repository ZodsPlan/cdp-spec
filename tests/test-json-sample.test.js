// Pseudocode for testing the schema
const Ajv = require("ajv");
const schema = require("../specs/cdp-schema.json");
const example = require("../examples/example-cdp.json");
const assert = require("assert");

describe("CDP Schema Validation", () => {
  let payload;
  let ajv;
  let validate;

  beforeEach(() => {
    ajv = new Ajv({ allErrors: true, strict: false });
    payload = Object.assign({}, example); // Clone the example to avoid mutation
    // Reset the validator before each test
    ajv.removeSchema(schema.$id);
    ajv.addSchema(schema);
    validate = ajv.compile(schema);
  });

  it("should validate a correct CDP example", () => {
    assert(validate(payload), "Example CDP does match the schema");
  });

  it("should fail validation when required fields are missing", () => {
    delete payload.body; // Remove body to test validation failure
    assert.strictEqual(
      validate(payload),
      false,
      "Validation should fail without body"
    );
  });

  it("should return validation errors", () => {
    const invalidPayload = { ...payload, content: null }; // Invalid payload
    const isValid = validate(invalidPayload);
    assert.strictEqual(
      isValid,
      false,
      "Validation should fail for invalid payload"
    );
    const errors = validate.errors;
    assert(errors, "There should be validation errors");
  });

  it("should validate the schema itself", () => {
    const schemaValidate = ajv.validateSchema(schema);
    assert(schemaValidate, "CDP schema is valid");
  });

  it("should fail validation with wrong data type", () => {
    const invalidExample = { ...payload, signature: 444 };
    console.log("Invalid Example:", invalidExample);
    assert.strictEqual(
      validate(invalidExample),
      false,
      "Validation should fail with wrong data type"
    );
  });

  it("should fail validation with additional properties", () => {
    const invalidExample = { ...payload, unexpectedField: 1 };
    assert.strictEqual(
      validate(invalidExample),
      false,
      "Validation should fail with additional properties"
    );
  });

  it('should allow a "version" to be specified', () => {
    const invalidExample = { ...payload, version: "1.4" };
    assert.strictEqual(
      validate(invalidExample),
      true,
      "Validation should not fail with invalid enum value"
    );
  });

  it("should fail validation when publicKey is missing", () => {
    const invalidExample = { ...payload };
    delete invalidExample.publicKey;
    assert.strictEqual(
      validate(invalidExample),
      false,
      "Validation should fail without publicKey"
    );
  });

  it("should fail validation when signature is missing", () => {
    const invalidExample = { ...payload };
    delete invalidExample.signature;
    assert.strictEqual(
      validate(invalidExample),
      false,
      "Validation should fail without signature"
    );
  });

  it("should validate when optional fields are omitted", () => {
    const minimalExample = {
      body: payload.body,
      publicKey: payload.publicKey,
      signature: payload.signature,
    };
    assert.strictEqual(
      validate(minimalExample),
      true,
      "Validation should pass with only required fields"
    );
  });
});
