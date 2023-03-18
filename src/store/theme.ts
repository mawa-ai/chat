import { writable } from "svelte/store";
import type { Theme } from "../types";

export default writable<Theme>({
    primaryColor: '#F0466F',
});