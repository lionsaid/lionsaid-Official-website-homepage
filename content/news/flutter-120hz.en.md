# Delivering 120Hz animation in Flutter

> 120Hz is not only “faster.” It is **stable**. We decompose stability into measurable segments, then optimize each one.

## Context

On high‑refresh devices, micro‑stutters become highly visible. Even small jitter in frame pacing is felt immediately.

We break the pipeline into three parts:

- input and event scheduling
- layout and repaint
- rasterization and composition

## Bottlenecks

1. **Scheduling jitter**: uncontrollable spikes on the UI thread
2. **Overdraw**: redundant painting that inflates GPU cost
3. **Layer complexity**: transparency + shadows causing expensive compositing

## Strategy

We follow a “reduce first, then refactor” approach:

- isolate hot widgets and cache stable subtrees
- merge large transparent layers to reduce overdraw
- move heavy work to `Isolate` or background queues
- enforce consistent animation cadence to avoid micro‑variance

Example (simplified):

```
Widget build(BuildContext context) {
  return RepaintBoundary(
    child: AnimatedBuilder(
      animation: controller,
      builder: (_, __) => _CardShell(progress: controller.value),
    ),
  );
}
```

## Results

- sustained 120Hz on ProMotion devices
- significantly fewer frame drops
- thermal budget stays under control

## Closing

High refresh is a discipline. It requires engineering and design to move together, and for every frame to have a reason.
