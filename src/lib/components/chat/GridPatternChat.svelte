<script>
	let opacity = '0.1';
	let color = 'rgb(30, 58, 138)';
	let size = '20px';
	let thickness = '1px';
</script>

<div
	class="pointer-events-none absolute inset-0"
	style:opacity
	style:--pattern-color={color}
	style:--pattern-size={size}
	style:--line-thickness={thickness}
></div>

<style>
	div {
		background-size: var(--pattern-size) var(--pattern-size);
		background-image:
			linear-gradient(
				to right,
				var(--pattern-color) var(--line-thickness),
				transparent var(--line-thickness)
			),
			linear-gradient(
				to bottom,
				var(--pattern-color) var(--line-thickness),
				transparent var(--line-thickness)
			);
	}
</style>
