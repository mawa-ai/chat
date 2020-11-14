<script>
	import Navbar from "./components/Navbar.svelte";
	import Content from "./components/Content.svelte";
	import Input from "./components/Input.svelte";
</script>

<style>
	@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

	.chat-container {
		display: flex;
		height: 100vh;
		flex-direction: column;
		font-family: "Montserrat", sans-serif;
	}
</style>

<div class="chat-container">
	<Navbar />
	<Content />
	<Input />
</div>
