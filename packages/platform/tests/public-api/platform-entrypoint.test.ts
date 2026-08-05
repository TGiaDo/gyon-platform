import assert from "node:assert";
import test from "node:test";

import {
  DeviceRuntimeFactory,
} from "../../src/index.js";


test(
  "platform exposes DeviceRuntimeFactory",
  () => {

    assert.equal(
      typeof DeviceRuntimeFactory.create,
      "function",
    );

  },
);
