import { validateOpts } from "../src/validateOpts";
import defaultOpts from "../optsDefaults";

test("The default opts validate against the schema.", async done => {
    const validatedOpts = await validateOpts(defaultOpts);
    expect(validatedOpts).toMatchObject(defaultOpts);
    done();
});

test("Options with invalid props throw error.", async done => {
    try {
        await validateOpts({ schema: "invalid" });
    } catch (err) {
        expect(err).toBe("data should have required property 'spacers'");
        done();
    }
});

test("Invalid schema file path throws an error", async done => {
    try {
        await validateOpts(defaultOpts, "invalid-file-path.json");
    } catch (err) {
        expect(err.code).toBe(`ENOENT`);
        done();
    }
});
