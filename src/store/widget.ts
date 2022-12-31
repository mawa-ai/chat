import { writable } from "svelte/store";
import type { Widget } from "../types";

export default writable<Widget>(undefined);