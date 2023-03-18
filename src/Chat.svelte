<script>
	import Navbar from "./components/Navbar.svelte";
	import Content from "./components/Content.svelte";
	import Input from "./components/Input.svelte";
	import widget from './store/widget';
</script>

<div class="chat-container" style:position={$widget ? 'fixed' : 'static'}>
	<Navbar />
	<Content />
	<Input />
</div>

<style>
	@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

	.chat-container {
		display: flex;
		height: 100%;
		width: 100%;
		flex-direction: column;
		font-family: "Montserrat", sans-serif;
	}
</style>
