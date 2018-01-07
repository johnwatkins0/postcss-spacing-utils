import fs from "fs";
import path from "path";
import postcss from "postcss";

import { spacingUtils } from "../src";

const getTestFile = () =>
    new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, "lib/default-test.css"), "utf8", (err, buffer) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(buffer);
        });
    });

test("The default opts generate the test CSS file.", async done => {
    const defaultFileBuffer = await getTestFile();
    const processor = postcss(postcss.plugin("spacing-utils", () => spacingUtils()));
    const result = await processor.process("@spacing-utils");
    expect(result.toString() + "\n").toBe(defaultFileBuffer);
    done();
});

test("An error occurs when invalid opts are passed in.", async done => {
    const processor = postcss(postcss.plugin("spacing-utils", () => spacingUtils({ invalidOpts: 0 })));

    try {
        await processor.process("@spacing-utils");
    } catch (err) {
        expect(err).toBe("data should have required property 'spacers'");
        done();
    }
});
