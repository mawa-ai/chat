import { writable } from "svelte/store";
import type { Message } from "../types";

export default writable<Message[]>([]);