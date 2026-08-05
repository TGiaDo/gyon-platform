import assert from "node:assert";
import test from "node:test";

import {
  PlatformContainer,
} from "../../src/container/index.js";


test(
  "PlatformContainer registers and resolves services",
  () => {

    const container =
      new PlatformContainer();


    const service = {
      name: "location",
    };


    container.register(
      "location",
      service,
    );


    const resolved =
      container.get<typeof service>(
        "location",
      );


    assert.equal(
      resolved,
      service,
    );

  },
);



test(
  "PlatformContainer checks service existence",
  () => {

    const container =
      new PlatformContainer();


    assert.equal(
      container.has(
        "navigation",
      ),
      false,
    );


    container.register(
      "navigation",
      {},
    );


    assert.equal(
      container.has(
        "navigation",
      ),
      true,
    );

  },
);



test(
  "PlatformContainer clears services",
  () => {

    const container =
      new PlatformContainer();


    container.register(
      "device",
      {},
    );


    container.clear();


    assert.equal(
      container.has(
        "device",
      ),
      false,
    );

  },
);
